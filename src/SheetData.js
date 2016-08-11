export class SheetData {
    get cells() {
        return [
            {
                reference: {
                    x: 1,
                    y: 7
                },
                value: 1
            },
            {
                reference: {
                    x: 64,
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

    getCellValue(x, y) {
        return this.cells
            .reduce((prev, curr) => curr.reference.x === x && curr.reference.y === y ? curr.value : prev, undefined);
    }
}