export function classes(constant, conditional) {
  const conditionalClasses = Object.keys(conditional)
    .filter(key => conditional[key])
    .join(" ");

  return `${constant} ${conditionalClasses}`;
}

export const UNICODE_BLANK = "\u00a0";

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
