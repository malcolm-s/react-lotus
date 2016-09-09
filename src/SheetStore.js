import { flatMap } from './CollectionUtils';
import { referenceMatch, fromStringReference } from './CellReferenceUtils';

const STORAGE_KEY = 'cells';

export class SheetStore {
    constructor() {
        this._cellDict = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    }

    get cells() {
        return flatMap(Object.keys(this._cellDict),
            x => Object.keys(this._cellDict[x])
                .map(y => ({
                    reference: {
                        x,
                        y
                    },
                    ...this._cellDict[x][y]
                }))
        );
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
            }
        } else {
            return undefined;
        }
    }

    getDisplayValue(cell) {
        const value = cell.value;

        if (value.startsWith('=')) {
            // it's a reference
            const otherCellReference = fromStringReference(value.substring(1));

            if (referenceMatch(cell.reference, otherCellReference)) {
                return 'cyclic references';
            }

            const otherCell = this.getCell(otherCellReference);

            if (otherCell) {
                return this.getDisplayValue(otherCell);
            } else {
                return 'not found';
            }
        } else {
            // it's a simple value
            return value;
        }
    }
}