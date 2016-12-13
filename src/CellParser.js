import { isAnyOf } from './CollectionUtils';
import { isReference } from './CellReferenceUtils';

const _operators = ['=', '+', '-'];

export class CellParser {

    parse(value) {
        const tokens = this._tokenise(value);
        const ast = this._lexify(tokens);
        const errors = this._validate(ast);
        if (errors) {
            return errors;
        } else {
            return ast;
        }
    }

    _tokenise(value) {
        let tokens = [];
        // yikes...
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

    _lexify(tokens) {
        // things to add
        // parentheses
        // strings
        // floating point numbers
        if (tokens[0] === '=') {
            let root = { type: 'expression', children: [] };
            let remaining = tokens.splice(1);

            for (let token of remaining) {
                if (isReference(token)) {
                    root.children.push({ type: 'reference', value: token });
                } else if (/[0-9]+/.test(token)) {
                    root.children.push({ type: 'constant', value: token });
                } else {
                    root.children.push({ type: 'function', value: token });
                }
            }

            return root;
        } else {
            return { type: 'constant', value: tokens[0] };
        }
    }

    _validate(ast) {
        if (ast.type === 'expression') {
            const error = { type: 'error', value: 'incomplete expression' };
            const children = ast.children;
            
            const firstChild = children[0];
            if (firstChild.type === 'function') {
                return error;
            }

            const lastChild = children[children.length - 1];
            if (lastChild.type === 'function') {
                return error;
           }
        }
    }
}