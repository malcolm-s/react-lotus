export class SheetData {
    constructor() {        
        this.cells = [
            {
                reference: {
                    x: 1,
                    y: 7
                },
                value: 1
            },
            {
                reference: {
                    x: 15,
                    y: 1
                },
                value: 2
            },
            {
                reference: {
                    x: 1,
                    y: 2
                },
                value: 3
            }
        ]
    }

    setCellValue(reference, value) {

    }

    getCell(x, y) {
        return this.cells
            .reduce((prev, curr) => curr.reference.x === x && curr.reference.y === y ? curr : prev, undefined);
    }

    getCellValue(x, y) {
        const cell = this.getCell(x, y);

        return cell === undefined ? cell : cell.value;
    }
}