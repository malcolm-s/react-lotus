import React, { Component } from 'react';

import './Column.css';

const UNICODE_BLANK = '\u00a0';

export class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const rows = this.props.values.map(x => ({ value: x, isSelected: false }))

    this.setState({ rows });
  }

  componentWillReceiveProps(nextProps) {
    console.log('receive', this.props);
  }

  render() {
    return (
      <div className="column">
        <LabelColumnCell label={this.props.header} />
        {this.state.rows.map((row, i) =>
          this.props.isLabelColumn
            ? <LabelColumnCell label={row.value} key={i} />
            : <ValueColumnCell value={row.value} key={i} onClick={() => this.handleClick(i)} isSelected={row.isSelected} />
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

class LabelColumnCell extends Component {
  render() {
    return (
      <div className="column__cell column__cell--header">
        {this.props.label || UNICODE_BLANK}
      </div>
    );
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

function classes(constant, conditional) {
  const conditionalClasses = Object.keys(conditional)
    .filter(key => conditional[key])
    .join(' ');

  return `${constant} ${conditionalClasses}`;
}

/*

1 - on click -> highlight
2 - on click again -> change to input
3 - on blur -> save value

*/