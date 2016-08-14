import React, { Component } from 'react';
import { SheetStore } from './SheetStore';
import { Sheet } from './Sheet';

export class App extends Component {
  render() {
    const store = new SheetStore();

    return (
      <Sheet store={store} />
    );
  }
}