import React, { Component } from 'react';
import { LabelCell } from './LabelCell';

export class LabelColumn extends Component {
  render() {
    return  (
      <div className="label-column">
        <LabelCell />
        {this.props.labels.map((l, i) => <LabelCell key={i} label={l} />)}
      </div>
    );
  }
}