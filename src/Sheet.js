import React, { Component } from 'react';
import { range, max } from './Utils';
import { Column } from './Column';

import './Sheet.css';

export class Sheet extends Component {
  render() {
    const data = this.props.data;

    const xRange = range(max(data.cells.map(c => c.reference.x)));
    const yRange = range(max(data.cells.map(c => c.reference.y)));

    let labelColumn = <Column values={yRange} isLabelColumn />;

    let valueColumns = xRange.map((x, i) => {
      let values = yRange.map(y => data.getCellValue(x, y));

      return <Column key={i} values={values} header={x} />
    });

    return (
      <div className="sheet">
        {labelColumn}
        {valueColumns}
      </div>
    )
  }
}