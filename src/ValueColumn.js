import React, { Component } from 'react';
import { LabelCell } from './LabelCell';
import { ValueCell } from './ValueCell';

export class ValueColumn extends Component {
  render() {
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

/*

1 - on click -> highlight                 DONE
2 - on click again -> change to input
3 - on blur -> save value

*/