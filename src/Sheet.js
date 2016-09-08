import React, { Component } from 'react';
import Rx from 'rxjs';
import { referenceMatch } from './Utils';
import { keydowns, isKeyMovementEvent, isInputEvent } from './GlobalKeyEvents';
import { and, not } from './FunctionUtils';

import { LabelColumn } from './LabelColumn';
import { ValueColumn } from './ValueColumn';

import './Sheet.css';

function isWithinBounds(reference, xMax, yMax) {
    return reference.x <= xMax
        && reference.y <= yMax
        && reference.y > 0
        && reference.x > 0;
}

export class Sheet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCellReference: {
                x: 1,
                y: 1
            },
            enteredCellReference: {}
        };

        this._handleCellClick = this._handleCellClick.bind(this);
        this._handleCellExit = this._handleCellExit.bind(this);

        this.subscriptions = new Rx.Subscription();
    }

    componentWillMount() {
        // movement around sheet
        this._initialiseKeyHandlers();

        const [ctrlKeyDowns, normalKeyDowns] = keydowns
            .filter(and(isKeyMovementEvent, not(isInputEvent)))
            .partition(e => e.ctrlKey);

        const keyMovements = normalKeyDowns
            .map(this._handleKeyMovement.bind(this))
            .filter(reference => isWithinBounds(reference, this.props.adapter.getXMax(), this.props.adapter.getYMax()));

        const ctrlKeyMovements = ctrlKeyDowns
            .map(this._handleCtrlKeyMovement.bind(this));

        const movementSubscription = Rx.Observable.merge(keyMovements, ctrlKeyMovements)
            .subscribe(reference => this.setState({ selectedCellReference: reference }));

        this.subscriptions.add(movementSubscription);

        // entering a cell
        const enterKeySubscription = keydowns
            .filter(and(e => e.key === 'Enter', not(isInputEvent)))
            .subscribe(() =>
                this.setState(current => ({ enteredCellReference: current.selectedCellReference })));

        this.subscriptions.add(enterKeySubscription);
    }

    componentWillUnmount() {
        this.subscriptions.unsubscribe();
    }

    _initialiseKeyHandlers() {
        this.normalKeyHandlers = {
            'ArrowLeft': ({ x, y }) => ({ x: x - 1, y }),
            'ArrowRight': ({ x, y }) => ({ x: x + 1, y }),
            'ArrowUp': ({ x, y }) => ({ x, y: y - 1 }),
            'ArrowDown': ({ x, y }) => ({ x, y: y + 1 })
        };

        this.ctrlKeyHandlers = {
            'ArrowLeft': ({ x, y }) => ({ x: 1, y }),
            'ArrowRight': ({ x, y }) => ({ x: this.props.adapter.getXMax(), y }),
            'ArrowUp': ({ x, y }) => ({ x, y: 1 }),
            'ArrowDown': ({ x, y }) => ({ x, y: this.props.adapter.getYMax() })
        };
    }

    _handleKeyMovement(e) {
        return this.normalKeyHandlers[e.key](this.state.selectedCellReference);
    }

    _handleCtrlKeyMovement(e) {
        return this.ctrlKeyHandlers[e.key](this.state.selectedCellReference);
    }

    render() {
        const columns = this.props.adapter.getColumns(this.state.selectedCellReference, this.state.enteredCellReference);

        const valueColumns = columns.map(column =>
            <ValueColumn
                key={column.label}
                cells={column.cells}
                header={column.label}
                onCellClick={this._handleCellClick}
                onCellExit={this._handleCellExit}/>
        );

        return (
            <div className="Sheet">
                <LabelColumn labels={this.props.adapter.getYRange() }/> {valueColumns}
            </div>
        )
    }

    _handleCellClick(cell) {
        if (referenceMatch(cell.reference, this.state.selectedCellReference)) {
            this.setState({ enteredCellReference: cell.reference });
        } else {
            this.setState({ selectedCellReference: cell.reference, enteredCellReference: {} });
        }
    }

    _handleCellExit(cell, value) {
        this.setState({ enteredCellReference: {} });

        this.props.store.setCellValue(cell.reference, value)
    }
}
