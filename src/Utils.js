export function classes(constant, conditional) {
  const conditionalClasses = Object.keys(conditional)
    .filter(key => conditional[key])
    .join(' ');

  return `${constant} ${conditionalClasses}`;
}

export const UNICODE_BLANK = '\u00a0';

export function referenceMatch(reference1, reference2) {
  return reference1.x === reference2.x
    && reference1.y === reference2.y
}