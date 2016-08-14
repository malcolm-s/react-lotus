import React, { Component } from 'react';
import { classes, UNICODE_BLANK } from './Utils';

import './Cell.css';
import './ValueCell.css';

export class ValueCell extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        this.setState({ value: this.props.cell.value || '' })
    }

    render() {
        const classNames = classes('Cell ValueCell', {
            'ValueCell--selected': this.props.isSelected,
            'ValueCell--entered': this.props.isEntered
        });

        return (
            <div className={classNames} onClick={this.props.onClick}>
                { this.props.isEntered
                    ? this._renderInput()
                    : this._renderValue() }
            </div>
        );
    }

    _renderValue() {
        return this.props.value || UNICODE_BLANK;
    }

    _renderInput() {
        return <input
            type="text"
            className="ValueCell__input"
            value={this.state.value}
            ref={el => el ? el.focus() : undefined}
            onChange={this._handleChange.bind(this) }
            onKeyUp={this._handleKeyUp.bind(this) }
            onBlur={this._handleBlur.bind(this) } />;
    }

    _handleChange(e) {
        this.setState({ value: e.target.value });
    }

    _handleKeyUp(e) {
        if (e.key === 'Enter') {
            this.props.onExit(this.props.cell, this.state.value);
        }
    }

    _handleBlur(e) {
        this.props.onExit(this.props.cell, this.state.value);
    }
}
