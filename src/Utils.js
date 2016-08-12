// todo: move to array utils
export function range(n) {
  let result = [];

  for (var index = 1; index <= n; index++) {
    result.push(index);
  }

  return result;
}

// todo: move to array utils
export function max(array) {
  return array.reduce((prev, curr) => curr > prev ? curr : prev);
}

export function classes(constant, conditional) {
  const conditionalClasses = Object.keys(conditional)
    .filter(key => conditional[key])
    .join(' ');

  return `${constant} ${conditionalClasses}`;
}

export const UNICODE_BLANK = '\u00a0';

// todo: make more generic - deep equal? or have Cell as a class with compare(other) method
export function referenceMatch(reference1, reference2) {
  return reference1.x === reference2.x
      && reference1.y === reference2.y
}