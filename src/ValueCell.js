import React, { Component } from 'react';
import { classes, UNICODE_BLANK } from './Utils';

import './Cell.css';
import './ValueCell.css';

export class ValueCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    componentWillMount() {
        this.setState({ value: this.props.cell.value || '' })
    }

    render() {
        const classNames = classes('Cell ValueCell', {
            'ValueCell--selected': this.props.isSelected,
            'ValueCell--entered': this.props.isEntered
        });

        let cellContent;

        if (this.props.isEntered) {
            cellContent = <input
                type="text"
                className="ValueCell__input"
                value={this.state.value}
                ref={el => el ? el.focus() : undefined}
                onChange={this.handleChange.bind(this) }
                onKeyUp={this.handleKeyUp.bind(this) }
                onBlur={this.handleBlur.bind(this) } />
        } else {
            cellContent = this.props.value || UNICODE_BLANK
        }

        return (
            <div className={classNames} onClick={this.props.onClick}>
                {cellContent}
            </div>
        );
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleKeyUp(e) {
        if (e.key === 'Enter') {
            this.props.onExit(this.props.cell, this.state.value);
        }
    }

    handleBlur(e) {
        this.props.onExit(this.props.cell, this.state.value);
    }
}
