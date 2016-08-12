import React, { Component } from 'react';
import { range, max } from './Utils';

import { LabelColumn } from './LabelColumn';
import { Column } from './Column';

import './Sheet.css';

export class Sheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCellReference: {}
    };

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
                onCellClick={this.handleClick} />
    });

    return (
      <div className="sheet">
        <LabelColumn labels={yRange} />
        {valueColumns}
      </div>
    )
  }

  getColumnCells(x, yRange) {
    // todo: move this up a layer so this component just gets the full list of cells
    return yRange.map(y => {
      let cell = this.props.data.getCell(x, y) || {
        reference: { x, y }
      };

      cell.isSelected = 
        cell.reference.x === this.state.selectedCellReference.x
        && cell.reference.y === this.state.selectedCellReference.y
      
      return cell;
    });
  }

  handleClick(cell) {
    this.setState({ selectedCellReference: cell.reference });
  }
}