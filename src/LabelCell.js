import React, { Component } from 'react';
import { UNICODE_BLANK } from './Utils';

export class LabelCell extends Component {
  render() {
    return (
      <div className="column__cell column__cell--header">
        {this.props.label || UNICODE_BLANK}
      </div>
    );
  }
}
