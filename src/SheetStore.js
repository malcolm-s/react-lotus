import { flatMap } from './CollectionUtils';
import { referenceMatch, fromStringReference, asXLabel } from './CellReferenceUtils';

const STORAGE_KEY = 'cells';

export class SheetStore {
    constructor(cellParser) {
        this._cellDict = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        this._cellParser = cellParser;
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
            };
        } else {
            return undefined;
        }
    }

    getDisplayValue(cell) {
        /*
        Parse cell content and convert it into a CellContentDescriptor, which can be of type:
            'value'
            'expression'
        SheetStore then gets display value based on descriptor:
            'value' -> return the value
            'expression' -> recursive data structure, oh ma lord!
         */
        console.log(`${asXLabel(cell.reference.x)}${cell.reference.y}`);
        const expression = this._cellParser.parse(cell.value);

        return this._evaluateExpression(expression);
    }

    _evaluateExpression(expression) {
        const type = expression.type;
        if (type === 'constant') {
            return expression.value;
        } else if (type === 'expression') {
            let value = expression.children.reduce(this._evaluate.bind(this), {});
            console.log('evaluated', value);
            return value;
        }
    }

    _evaluate(context, next) {
        console.log('curr', context);
        console.log('next', next);

        if (next.type === 'reference') {
            // cyclic references
            const reference = fromStringReference(next.value);
            const cell = this.getCell(reference);

            return this.getDisplayValue(cell);
        }
        return next;
    }
}