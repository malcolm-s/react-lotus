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