import React, { Component } from "react";
import { SheetStore } from "./SheetStore";
import { SheetAdapter } from "./SheetAdapter";
import { Sheet } from "./Sheet";
import { CellParser } from "./CellParser";

export class App extends Component {
  render() {
    const cellParser = new CellParser();
    const store = new SheetStore(cellParser);
    const adapter = new SheetAdapter(store);

    return <Sheet adapter={adapter} />;
  }
}
