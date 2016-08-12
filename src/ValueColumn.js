import React, { Component } from 'react';
import { LabelCell } from './LabelCell';
import { ValueCell } from './ValueCell';

export class ValueColumn extends Component {
  render() {
    // todo: resolve this weird event handler binding logic - either use currying or think
    // about moving code to not require all this passing through
    // or at least make onClick work the same as onExit 
    const handleClick = this.props.onCellClick;
    const handleExit = this.props.onCellExit;

    return (
      <div className="ValueColumn">
        <LabelCell label={this.props.header} />
        {this.props.cells.map((cell, i) =>
            <ValueCell 
              key={i} 
              cell={cell} 
              onClick={() => handleClick(cell)}
              onExit={handleExit}
              value={cell.value} 
              isSelected={cell.isSelected}
              isEntered={cell.isEntered} />
        ) }
      </div>
    );
  }
}