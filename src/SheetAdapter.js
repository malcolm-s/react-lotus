import { range, maxOrDefault } from './CollectionUtils';
import { referenceMatch, asXLabel } from './CellReferenceUtils';

const X_DIRECTION_BUFFER = 5;
const Y_DIRECTION_BUFFER = X_DIRECTION_BUFFER;

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
            label: asXLabel(x),
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

    getCell(reference) {
        return this.store.getCell(reference);
    }

    setCellValue(reference, value) {
        this.store.setCellValue(reference, value);
    }
}