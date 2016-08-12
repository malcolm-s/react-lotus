export class SheetData {
    constructor() {
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
        }
    }

    get cells() {
        return Object.keys(this._cellDict)
            .map(x => Object.keys(this._cellDict[x])
                .map(y => ({
                    reference: {
                        x,
                        y
                    },
                    data: this._cellDict[x][y]
                }))
            )
            .reduce((prev, curr) => prev.concat(curr), []);
    }

    setCellValue(reference, value) {
        const { x, y } = reference;

        if (!this._cellDict[x]) {
            this._cellDict[x] = {};
        }

        if (!this._cellDict[x][y]) {
            this._cellDict[x][y] = {};
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
                ...existing
            }
        } else {
            return undefined;
        }
    }

    getCellValue(x, y) {
        const cell = this.getCell(x, y);

        return cell === undefined ? cell : cell.value;
    }
}