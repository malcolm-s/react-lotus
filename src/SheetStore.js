import { flatMap } from "./CollectionUtils";
import {
  referenceMatch,
  fromStringReference,
  asXLabel
} from "./CellReferenceUtils";
import { CellEvaluator } from "./CellEvaluator";

const STORAGE_KEY = "cells";

export class SheetStore {
  constructor(cellParser) {
    this._cellDict = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    this._cellParser = cellParser;
    this._cellEvaluator = new CellEvaluator(this);
  }

  get cells() {
    return flatMap(Object.keys(this._cellDict), x => Object.keys(
      this._cellDict[x]
    ).map(y => ({
      reference: {
        x,
        y
      },
      ...this._cellDict[x][y]
    })));
  }

  setCellValue({ x, y }, value) {
    if (!this._cellDict[x]) {
      this._cellDict[x] = {};
    }

    this._cellDict[x][y] = {
      value
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._cellDict));
  }

  getCell({ x, y }) {
    const existing = (this._cellDict[x] || {})[y];

    if (existing) {
      return {
        reference: { x, y },
        ...existing
      };
    } else {
      return undefined;
    }
  }

  getDisplayValue(cell) {
    /*
        Parse cell content and convert it into a CellContentDescriptor, which can be of type:
            'value'
            'expression'
        SheetStore then gets display value based on descriptor:
            'value' -> return the value
            'expression' -> recursive data structure, oh ma lord!
         */
    console.log(`${asXLabel(cell.reference.x)}${cell.reference.y}`);
    const expression = this._cellParser.parse(cell.value);
    const evaluated = this._cellEvaluator.evaluate(expression);
    console.log("evaluated value", evaluated);

    return evaluated;
  }

  getDisplayValueFromStringReference(stringRef) {
    const reference = fromStringReference(stringRef);
    const cell = this.getCell(reference);

    return this.getDisplayValue(cell);
  }
}
