import React, { Component } from 'react';
import { referenceMatch, isEmpty } from './Utils';
import { SheetAdapter } from './SheetAdapter';

import { LabelColumn } from './LabelColumn';
import { ValueColumn } from './ValueColumn';

import './Sheet.css';

export class Sheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCellReference: {},
      enteredCellReference: {}
    };

    this._handleCellClick = this._handleCellClick.bind(this);
    this._handleCellExit = this._handleCellExit.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this)
  }

  componentWillMount() {
    this.adapter = new SheetAdapter(this.props.store);
    window.addEventListener('keyup', this._handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this._handleKeyUp)
  }

  _handleKeyUp(e) {
    if (isEmpty(this.state.selectedCellReference)) {
      this.setState({ selectedCellReference: { x: 1, y: 1}});
      return;
    }

    const handlers = {
      'ArrowLeft': ({ x, y }) => ({ x: x - 1, y }),
      'ArrowRight': ({ x, y }) => ({ x: x + 1, y }),
      'ArrowUp': ({ x, y }) => ({ x, y: y - 1 }),
      'ArrowDown': ({ x, y }) => ({ x, y: y + 1 })
    };

    const controlHandlers = {
      'ArrowLeft': ({ x, y }) => ({ x: 1, y }),
      'ArrowRight': ({ x, y }) => ({ x: this.adapter.getXMax(), y }),
      'ArrowUp': ({ x, y }) => ({ x, y: 1 }),
      'ArrowDown': ({ x, y }) => ({ x, y: this.adapter.getYMax() })
    };
    
    const handler = e.ctrlKey ? controlHandlers[e.key] : handlers[e.key];

    // todo: worth getting Rx at this stage? handle both of these if statements more cleanly
    // also definitely need for hold-down functionality
    if (handler) {
      const newReference = handler(this.state.selectedCellReference);
      const withinBounds = 
        newReference.x <= this.adapter.getXRange().length
        && newReference.y <= this.adapter.getYRange().length
        && newReference.y > 0
        && newReference.x > 0;

      if (withinBounds) {
        this.setState({ selectedCellReference: newReference });
      }
    }
  }

  render() {
    const columns = this.adapter.getColumns(this.state.selectedCellReference, this.state.enteredCellReference);

    const valueColumns = columns.map(column =>
      <ValueColumn
        key={column.label}
        cells={column.cells}
        header={column.label}
        onCellClick={this._handleCellClick}
        onCellExit={this._handleCellExit} />
    );

    return (
      <div className="Sheet">
        <LabelColumn labels={this.adapter.getYRange() } />
        {valueColumns}
      </div>
    )
  }

  _handleCellClick(cell) {
    if (referenceMatch(cell.reference, this.state.selectedCellReference)) {
      this.setState({
        enteredCellReference: cell.reference
      });
    } else {
      this.setState({
        selectedCellReference: cell.reference,
        enteredCellReference: {}
      });
    }
  }

  _handleCellExit(cell, value) {
    this.setState({
      enteredCellReference: {}
    });

    this.props.store.setCellValue(cell.reference, value)
  }
}