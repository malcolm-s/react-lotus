import React, { Component } from 'react';
import { range, max } from './Utils';

import { LabelColumn } from './LabelColumn';
import { Column } from './Column';

import './Sheet.css';

export class Sheet extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const data = this.props.data;

    const xRange = range(max(data.cells.map(c => c.reference.x)));
    const yRange = range(max(data.cells.map(c => c.reference.y)));

    const valueColumns = xRange.map((x, i) => {
      let values = yRange.map(y => data.getCellValue(x, y));
      const cells = this.getColumnCells(x, yRange);

      return <Column
                key={i} 
                cells={cells}
                values={values} 
                header={x} 
                onValueCellClick={this.handleClick} />
    });

    return (
      <div className="sheet">
        <LabelColumn labels={yRange} />
        {valueColumns}
      </div>
    )
  }

  getColumnCells(x, yRange) {
    return yRange.map(y => {
      const cell = this.props.data.getCell(x, y);

      return cell || {
        reference: { x, y }
      }
    });
  }

  handleClick() {

  }
}