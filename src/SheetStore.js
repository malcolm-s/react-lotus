import { flatMap } from './CollectionUtils';

export class SheetStore {
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
            5: {
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
}