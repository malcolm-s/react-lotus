import React, { Component } from 'react';
import { range, max } from './CollectionUtils';
import { referenceMatch } from './Utils';

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

    const xRange = range(max(data.cells.map(c => parseInt(c.reference.x))));
    const yRange = range(max(data.cells.map(c => parseInt(c.reference.y))));

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
      <div className="Sheet">
        <LabelColumn labels={yRange} />
        {valueColumns}
      </div>
    )
  }

  getColumnCells(x, yRange) {
    // todo: move this up a layer so this component just gets the full list of cells with selected/entered
    // that component should manage the extending of cell state to include UI related things i.e. selected/entered
    return yRange.map(y => {
      const reference = { x, y };
      let cell = this.props.data.getCell(reference) || { reference };

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
    this.setState({
      enteredCellReference: {}
    });
    const { x, y } = cell.reference;

    this.props.data.setCellValue(cell.reference, value)
  }
}