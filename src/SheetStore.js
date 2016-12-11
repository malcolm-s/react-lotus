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
        const evaluated = this._evaluateExpression(expression);
        console.log('evaluated value', evaluated);

        return evaluated;
    }

    _evaluateExpression(expression) {
        const type = expression.type;
        if (type === 'constant') {
            return expression.value;
        } else if (type === 'expression') {
            let context = expression.children.reduce(this._evaluate.bind(this), { });
            console.log('evaluated context', context);
            if (context.fn) {
                context.value = context.fn.apply(this, context.args);
            }
            console.log('evaluated context', context);
            return context.value;
        }
    }

    _evaluate(context, next) {
        console.log('curr', context);
        console.log('next', next);

        if (next.type === 'constant') {
            if (context.fn) {
                context.args.push(next.value);
            } else {
                context.value = next.value;
            }
        } else if (next.type === 'reference') {
            // cyclic references
            const reference = fromStringReference(next.value);
            const cell = this.getCell(reference);
            const value = this.getDisplayValue(cell);

            if (context.fn) {
                context.args.push(value);
            } else {
                context.value = value;
            }
        } else if (next.type === 'function') {
            context.args = [];
            context.args.push(context.value);
            context.fn = function (a, b) {
                return parseFloat(a) + parseFloat(b);
            };
        }

        return context;
    }
}