import { flatMap } from './CollectionUtils';

export class SheetData {
    constructor() {
        this._cellDict = {};
        this._initCellData();
    }

    _initCellData() {
        this._cellDict = {
            1: {
                2: {
                    value: 3
                },
                7: {
                    value: 1
                }
            },
            15: {
                1: {
                    value: 1
                }
            }
        };
    }

    get cells() {
        return flatMap(Object.keys(this._cellDict),
            x => Object.keys(this._cellDict[x])
                .map(y => ({
                    reference: {
                        x,
                        y
                    },
                    data: this._cellDict[x][y]
                }))
        );
    }

    setCellValue(reference, value) {
        // todo: decide on (reference) vs (x, y) format of access methods
        const { x, y } = reference;

        if (!this._cellDict[x]) {
            this._cellDict[x] = {};
        }

        this._cellDict[x][y] = {
            value
        };
    }

    getCell(x, y) {
        const existing = (this._cellDict[x] || {})[y];

        if (existing) {
            return {
                reference: { x, y },
                // todo: this line makes the structure of the data inconsistent with how it's consumed
                // for now maybe better just to keep it same? cell.data.value rather than cell.value
                ...existing
            }
        } else {
            return undefined;
        }
    }
}