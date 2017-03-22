import React, { Component } from "react";
import { LabelCell } from "./LabelCell";
import { ValueCell } from "./ValueCell";

export class ValueColumn extends Component {
  render() {
    return (
      <div className="ValueColumn">
        <LabelCell label={this.props.header} />
        {this.props.cells.map((cell, i) => (
          <ValueCell
            key={i}
            cell={cell}
            onCellClick={this.props.onCellClick}
            onCellExit={this.props.onCellExit}
            isSelected={cell.isSelected}
            isEntered={cell.isEntered}
          />
        ))}
      </div>
    );
  }
}
