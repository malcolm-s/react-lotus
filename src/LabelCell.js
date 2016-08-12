import React, { Component } from 'react';
import { UNICODE_BLANK } from './Utils';

import './Cell.css';
import './LabelCell.css';

export class LabelCell extends Component {
  render() {
    return (
      <div className="Cell LabelCell">
        {this.props.label || UNICODE_BLANK}
      </div>
    );
  }
}
