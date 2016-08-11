import React, { Component } from 'react';
import { SheetData } from './SheetData';
import { Sheet } from './Sheet';

export class App extends Component {
  render() {
    let sheetData = new SheetData();

    return (
      <Sheet data={sheetData} />
    );
  }
}