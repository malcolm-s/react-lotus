import React, { Component } from 'react';
import { range, max, referenceMatch } from './Utils';

import { LabelColumn } from './LabelColumn';
import { ValueColumn } from './ValueColumn';

import './Sheet.css';

export class Sheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCellReference: {},
      enteredCellReference: {}
    };

    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleCellExit = this.handleCellExit.bind(this);
  }

  render() {
    const data = this.props.data;

    const xRange = range(max(data.cells.map(c => c.reference.x)));
    const yRange = range(max(data.cells.map(c => c.reference.y)));

    const valueColumns = xRange.map((x, i) => {
      const cells = this.getColumnCells(x, yRange);

      return <ValueColumn
        key={i}
        cells={cells}
        header={x}
        onCellClick={this.handleCellClick}        
        onCellExit={this.handleCellExit} />
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

      cell.isSelected = referenceMatch(cell.reference, this.state.selectedCellReference);

      cell.isEntered = referenceMatch(cell.reference, this.state.enteredCellReference);

      return cell;
    });
  }

  handleCellClick(cell) {
    if (referenceMatch(cell.reference, this.state.selectedCellReference)) {
      this.setState({
        enteredCellReference: cell.reference
      });
    } else {
      this.setState({ 
        selectedCellReference: cell.reference,
        enteredCellReference: {} 
      });
    }
  }

  handleCellExit(cell, value) {
    console.log('cell', cell);
    console.log('value', value);
    this.setState({
      selectedCellReference: {},
      enteredCellReference: {}
    });
    const { x, y } = cell.reference;

    console.log('before', this.props.data.getCell(x, y));
    this.props.data.setCellValue(cell.reference, value)
    console.log('after', this.props.data.getCell(x, y));
  }
}