import React, { Component } from 'react';
import { LabelCell } from './LabelCell';
import { ValueCell } from './ValueCell';

export class ValueColumn extends Component {
  render() {
    const handleClick = this.props.onCellClick;

    return (
      <div className="ValueColumn">
        <LabelCell label={this.props.header} />
        {this.props.cells.map((cell, i) =>
            <ValueCell value={cell.value} key={i} onClick={() => handleClick(cell)} isSelected={cell.isSelected} />
        ) }
      </div>
    );
  }

  handleClick(index) {
    const newRows = this.state.rows.reduce((prev, curr, i) => {
      if (i === index) {
        prev.push({
          isSelected: true,
          value: curr.value
        });
      } else {
        prev.push({
          isSelected: false,
          value: curr.value
        });
      }

      return prev;
    }, []);
    
    this.setState({ rows: newRows });
  }
}

/*

1 - on click -> highlight
2 - on click again -> change to input
3 - on blur -> save value

*/