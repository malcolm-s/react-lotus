import test from "tape";
import { CellEvaluator } from "./CellEvaluator";

test("CellEvaluator.evaluate handles constant expressions", t => {
  const evaluator = new CellEvaluator();
  const expression = { type: "constant", value: "1" };
  const result = evaluator.evaluate(expression);

  t.equal(result, "1");
  t.end();
});

test("CellEvaluator.evaluate handles constant from expression", t => {
  const evaluator = new CellEvaluator();
  const expression = {
    type: "expression",
    children: [{ type: "constant", value: "1" }]
  };
  const result = evaluator.evaluate(expression);

  t.equal(result, "1");
  t.end();
});

test("CellEvaluator.evaluate handles reference in expression", t => {
  const evaluator = new CellEvaluator({
    getDisplayValueFromStringReference(reference) {
      return "1";
    }
  });
  const expression = {
    type: "expression",
    children: [{ type: "reference", value: "a1" }]
  };
  const result = evaluator.evaluate(expression);

  t.equal(result, "1");
  t.end();
});

test("CellEvaluator.evaluate handles multiple references in expression", t => {
  const evaluator = new CellEvaluator({
    getDisplayValueFromStringReference(reference) {
      return "1";
    }
  });
  const expression = {
    type: "expression",
    children: [
      { type: "reference", value: "a1" },
      { type: "function", value: "+" },
      { type: "reference", value: "a1" }
    ]
  };
  const result = evaluator.evaluate(expression);

  t.equal(result, 2);
  t.end();
});

test("CellEvaluator.evaluate handles multiple operators in expression", t => {
  const evaluator = new CellEvaluator({
    getDisplayValueFromStringReference(reference) {
      return "1";
    }
  });
  const expression = {
    type: "expression",
    children: [
      { type: "reference", value: "a1" },
      { type: "function", value: "+" },
      { type: "reference", value: "a1" },
      { type: "function", value: "+" },
      { type: "reference", value: "a1" }
    ]
  };
  const result = evaluator.evaluate(expression);

  t.equal(result, 3);
  t.end();
});
