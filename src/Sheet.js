import React, { Component } from 'react';
import { referenceMatch } from './Utils';
import { SheetAdapter } from './SheetAdapter';

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

  componentWillMount() {
    this.adapter = new SheetAdapter(this.props.store);
  }

  render() {
    const columns = this.adapter.getColumns(this.state.selectedCellReference, this.state.enteredCellReference);

    const valueColumns = columns.map(column =>
      <ValueColumn
        key={column.label}
        cells={column.cells}
        header={column.label}
        onCellClick={this.handleCellClick}
        onCellExit={this.handleCellExit} />
    );

    return (
      <div className="Sheet">
        <LabelColumn labels={this.adapter.getYRange() } />
        {valueColumns}
      </div>
    )
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

    this.props.store.setCellValue(cell.reference, value)
  }
}