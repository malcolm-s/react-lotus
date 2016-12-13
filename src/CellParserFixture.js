import test from 'tape';
import { CellParser } from './CellParser';

test('CellParser.parse handles constant integers', t => {
    const parser = new CellParser();
    const content = '1';
    const ast = parser.parse(content);

    t.equal(ast.type, 'constant');
    t.equal(ast.value, '1');
    t.end();
});

test('CellParser.parse handles constant strings', t => {
    const parser = new CellParser();
    const content = 'hello';
    const ast = parser.parse(content);

    t.equal(ast.type, 'constant')
    t.equal(ast.value, 'hello');
    t.end();
});

test('CellParser.parse handles single references', t => {
    const parser = new CellParser();
    const content = '=a1';
    const ast = parser.parse(content);

    t.equal(ast.type, 'expression')
    t.assert(ast.children);
    t.equal(ast.children[0].type, 'reference');
    t.equal(ast.children[0].value, 'a1');
    t.end();
});

test('CellParser.parse handles references and plus operator and constant', t => {
    const parser = new CellParser();
    const content = '=a1+1';
    const ast = parser.parse(content);

    t.equal(ast.type, 'expression');
    t.assert(ast.children);
    t.equal(ast.children.length, 3);
    t.equal(ast.children[0].type, 'reference');
    t.equal(ast.children[0].value, 'a1');
    t.equal(ast.children[1].type, 'function');
    t.equal(ast.children[1].value, '+');
    t.equal(ast.children[2].type, 'constant');
    t.equal(ast.children[2].value, '1');
    t.end();
});

test('CellParser.parse handles references and plus operator and reference', t => {
    const parser = new CellParser();
    const content = '=a1+a1';
    const ast = parser.parse(content);

    t.equal(ast.type, 'expression');
    t.assert(ast.children);
    t.equal(ast.children.length, 3);
    t.equal(ast.children[0].type, 'reference');
    t.equal(ast.children[0].value, 'a1');
    t.equal(ast.children[1].type, 'function');
    t.equal(ast.children[1].value, '+');
    t.equal(ast.children[2].type, 'reference');
    t.equal(ast.children[2].value, 'a1');
    t.end();
});