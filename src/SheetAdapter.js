import { range, max } from './CollectionUtils';
import { referenceMatch } from './Utils';

const X_DIRECTION_BUFFER = 5;
const Y_DIRECTION_BUFFER = X_DIRECTION_BUFFER;

export class SheetAdapter {
    constructor(store) {
        this.store = store;
    }

    getXMax() {
        return max(this.store.cells.map(c => parseInt(c.reference.x, 10))) + X_DIRECTION_BUFFER;
    }

    getYMax() {
        return max(this.store.cells.map(c => parseInt(c.reference.y, 10))) + Y_DIRECTION_BUFFER;
    }

    getXRange() {
        return range(this.getXMax());
    }

    getYRange() {
        return range(this.getYMax());
    }

    getColumns(selectedCellReference, enteredCellReference) {
        return this.getXRange().map(x => ({
            label: x,
            cells: this.getYRange().map(y => {
                const reference = { x, y };
                let cell = this.store.getCell(reference) || { reference };

                cell.isSelected = referenceMatch(cell.reference, selectedCellReference);
                cell.isEntered = referenceMatch(cell.reference, enteredCellReference);

                return cell;
            })
        }));
    }
}