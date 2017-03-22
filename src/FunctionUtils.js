export function and(f, g) {
  return function _and() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  };
}

export function not(f) {
  return function _not() {
    return !f.apply(this, arguments);
  };
}
