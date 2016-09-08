import { range, maxOrDefault } from './CollectionUtils';
import { referenceMatch } from './Utils';

const X_DIRECTION_BUFFER = 5;
const Y_DIRECTION_BUFFER = X_DIRECTION_BUFFER;

function convertToLetterLabel(n) {
    const factor = n / 26;

    if (factor > 1) {
        const roundedFactor = Math.floor(factor);

        const initialLetter = String.fromCharCode(96 + roundedFactor); 

        const finalLetter = String.fromCharCode(97 + n - (26 * roundedFactor));

        return (initialLetter + finalLetter).toUpperCase();
    }

    return String.fromCharCode(96 + n).toUpperCase();
}

export class SheetAdapter {
    constructor(store) {
        this.store = store;
    }

    getXMax() {
        return maxOrDefault(this.store.cells.map(c => parseInt(c.reference.x, 10))) + X_DIRECTION_BUFFER;
    }

    getYMax() {
        return maxOrDefault(this.store.cells.map(c => parseInt(c.reference.y, 10))) + Y_DIRECTION_BUFFER;
    }

    getXRange() {
        return range(this.getXMax());
    }

    getYRange() {
        return range(this.getYMax());
    }

    getColumns(selectedCellReference, enteredCellReference) {
        return this.getXRange().map(x => ({
            label: convertToLetterLabel(x),
            cells: this.getYRange().map(y => {
                const reference = { x, y };
                let cell = this.store.getCell(reference) || { reference };

                cell.isSelected = referenceMatch(cell.reference, selectedCellReference);
                cell.isEntered = referenceMatch(cell.reference, enteredCellReference);

                // display value
                if (cell.value) {
                    cell.displayValue = this.store.getDisplayValue(cell);
                }

                return cell;
            })
        }));
    }
}