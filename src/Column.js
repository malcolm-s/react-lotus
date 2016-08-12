import React, { Component } from 'react';
import { classes, UNICODE_BLANK } from './Utils';
import { LabelCell } from './LabelCell';
import './Column.css';

export class Column extends Component {
  render() {
    const handleClick = this.props.onCellClick;

    return (
      <div className="column">
        <LabelCell label={this.props.header} />
        {this.props.cells.map((cell, i) =>
            <ValueColumnCell value={cell.value} key={i} onClick={() => handleClick(cell)} isSelected={cell.isSelected} />
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

class ValueColumnCell extends Component {
  render() {
    const classNames = classes('column__cell column__cell--value', {
      'column__cell--selected': this.props.isSelected
    });

    return (
      <div className={classNames} onClick={this.props.onClick}>
        {this.props.value || UNICODE_BLANK}
      </div>
    );
  }
}



/*

1 - on click -> highlight
2 - on click again -> change to input
3 - on blur -> save value

*/