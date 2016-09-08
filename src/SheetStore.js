import { flatMap } from './CollectionUtils';

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
}