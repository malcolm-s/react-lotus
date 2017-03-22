const FUNCTIONS = {
  "+": function(a, b) {
    return parseFloat(a) + parseFloat(b);
  },
  "-": function(a, b) {
    return parseFloat(a) - parseFloat(b);
  }
};

export class CellEvaluator {
  constructor(store) {
    this._store = store;
  }

  evaluate(expression) {
    const type = expression.type;
    if (type === "constant") {
      return expression.value;
    } else if (type === "expression") {
      let context = expression.children.reduce(this._evaluateChild.bind(this), {
      });
      console.log("evaluated context", context);
      if (context.fn) {
        context.value = context.fn.apply(this, context.args);
      }
      console.log("evaluated context", context);
      return context.value;
    }
  }

  _evaluateChild(context, next) {
    console.log("curr", context);
    console.log("next", next);

    if (next.type === "constant") {
      if (context.fn) {
        context.args.push(next.value);
      } else {
        context.value = next.value;
      }
    } else if (next.type === "reference") {
      // cyclic references
      const value = this._store.getDisplayValueFromStringReference(next.value);

      if (context.fn) {
        context.args.push(value);
      } else {
        context.value = value;
      }
    } else if (next.type === "function") {
      context.args = [];
      context.args.push(context.value);
      context.fn = FUNCTIONS[next.value];
    }

    return context;
  }
}
