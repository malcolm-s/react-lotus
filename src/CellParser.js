import { isAnyOf } from './CollectionUtils';

const _operators = ['=', '+'];

export class CellParser {

    parse(value) {
        const tokens = this._tokenise(value);
        console.log('tokens', tokens);
        if (value.startsWith('=')) {
            // // it's a reference
            // const otherCellReference = fromStringReference(value.substring(1));

            // if (referenceMatch(cell.reference, otherCellReference)) {
            //     return 'cyclic references';
            // }

            // const otherCell = this.getCell(otherCellReference);

            // if (otherCell) {
            //     return this.getDisplayValue(otherCell);
            // } else {
            //     return 'not found';
            // }
            return { type: 'expression' }
        } else {
            // it's a simple value
            return { type: 'constant', value };
        }
    }

    _tokenise(value) {
        let tokens = [];
        let upToNow = "";

        for (let i = 0; i < value.length; i++) {
            const char = value[i];

            if (isAnyOf(_operators, char)) {
                if (upToNow.length > 0) {
                    tokens.push(upToNow);
                    upToNow = "";
                }
                tokens.push(char);
            } else {
                upToNow += char;
            }
        }
        tokens.push(upToNow);

        return tokens;
    }
}