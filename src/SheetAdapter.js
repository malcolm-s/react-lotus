import { range, max } from './CollectionUtils';
import { referenceMatch } from './Utils';

export class SheetAdapter {
    constructor(store) {
        this.store = store;
    }

    _getXRange() {
        return range(max(this.store.cells.map(c => parseInt(c.reference.x, 10))));
    }

    getYRange() {
        return range(max(this.store.cells.map(c => parseInt(c.reference.y, 10))));
    }

    getColumns(selectedCellReference, enteredCellReference) {
        return this._getXRange().map(x => ({
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