import React, { Component } from 'react';
import './App.css';

let sheetData = {
  cells: [
    {
      reference: {
        x: 1,
        y: 7
      },
      value: 1
    },
    {
      reference: {
        x: 64,
        y: 1
      },
      value: 2
    },
    {
      reference: {
        x: 1,
        y: 2
      },
      value: 3
    }
  ]
}

export class App extends Component {
  render() {

    return (
      <Sheet data={sheetData} />
    );
  }
}

class Sheet extends Component {
  render() {
    const data = this.props.data;

    const xRange = range(max(data.cells.map(c => c.reference.x)));
    const yRange = range(max(data.cells.map(c => c.reference.y)));

    let labelColumn = <Column values={yRange} isLabelColumn />;

    let valueColumns = xRange.map((x, i) => {
      let values = yRange.map(y => getCellValue(x, y));

      return <Column key={i} values={values} header={x} />
    });

    return (
      <div className="sheet">
        {labelColumn}
        {valueColumns}
      </div>
    )
  }
}

const UNICODE_BLANK = '\u00a0';

class Column extends Component {
  render() {
    const valueClassName = 'column__cell column__cell--value'
      + (this.props.isLabelColumn ? ' column__cell--header' : '');

    return (
      <div className="column">
        <div className="column__cell column__cell--header">
          {this.props.header || UNICODE_BLANK}
        </div>
        {this.props.values.map((x, i) =>
          <div key={i} className={valueClassName}>
            {x || UNICODE_BLANK}
          </div>) }
      </div>
    );
  }
}

function getCellValue(x, y) {
  return sheetData.cells
    .reduce((prev, curr) => curr.reference.x === x && curr.reference.y === y ? curr.value : prev, undefined);
}

function range(n) {
  let result = [];

  for (var index = 1; index <= n; index++) {
    result.push(index);
  }

  return result;
}

function max(array) {
  return array.reduce((prev, curr) => curr > prev ? curr : prev);
}