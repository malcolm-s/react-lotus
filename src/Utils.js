export function range(n) {
  let result = [];

  for (var index = 1; index <= n; index++) {
    result.push(index);
  }

  return result;
}

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