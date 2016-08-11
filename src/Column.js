import React, { Component } from 'react';

import './Column.css';

const UNICODE_BLANK = '\u00a0';

export class Column extends Component {
  render() {
    const valueClassName = 'column__cell column__cell--value'
      + (this.props.isLabelColumn ? ' column__cell--header' : '');

    return (
      <div className="column">
        <div className="column__cell column__cell--header">
          {this.props.header || UNICODE_BLANK}
        </div>
        {this.props.values.map((x, i) =>
          <div key={i} className={valueClassName}>  
            {x || UNICODE_BLANK}
          </div>) }
      </div>
    );
  }
}