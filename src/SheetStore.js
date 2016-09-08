import { flatMap } from './CollectionUtils';
import { referenceMatch } from './Utils';

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
            console.log(cell);
            
            const otherCellReference = getReferenceFromString(value.substring(1));
            console.log(otherCellReference);

            if (referenceMatch(cell.reference, otherCellReference)) {
                return 'cyclic references';
            }

            const otherCell = this.getCell(otherCellReference);
            console.log(otherCell);

            if (otherCell) {
                return otherCell.value;
            } else {
                return 'not found';
            }
        } else {
            // it's a simple value
            return value;
        }
    }
}

function getReferenceFromString(reference) {
    // A1   ->  { x: 1,  y: 1 }
    // AA1  ->  { x: 27, y: 1 }

    const parts = reference.split(/(\d+)/).filter(p => p.length > 0);

    return {
        x: getNumberValueFromStringLabel(parts[0].toLowerCase()),
        y: parseInt(parts[1], 10)
    };
}

function getNumberValueFromStringLabel(label) {
    if (label.length === 1) {
        return label.charCodeAt(0) - 96;
    } else {
        return (label.charCodeAt(0) - 96) * 26 + (label.charCodeAt(1) - 96);
    }
}