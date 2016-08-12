import React, { Component } from 'react';
import { classes, UNICODE_BLANK } from './Utils';

import './Cell.css';
import './ValueCell.css';

export class ValueCell extends Component {
  render() {
    const classNames = classes('Cell ValueCell', {
      'ValueCell--selected': this.props.isSelected
    });

    return (
      <div className={classNames} onClick={this.props.onClick}>
        {this.props.value || UNICODE_BLANK}
      </div>
    );
  }
}
