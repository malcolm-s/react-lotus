import test from 'tape';
import { CellEvaluator } from './CellEvaluator';

test('CellEvaluator.evaluate handles constant expressions', t => {
    const evaluator = new CellEvaluator();
    const expression = { type: 'constant', value: '1' };
    const result = evaluator.evaluate(expression);

    t.equal(result, '1');
    t.end();
});
