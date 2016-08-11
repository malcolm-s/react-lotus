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