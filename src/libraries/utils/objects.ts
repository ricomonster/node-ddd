/**
 * Validates if the given parameter is an object or not.
 *
 * @param {unknown} obj
 * @returns boolean
 */
export const isObject = (obj: unknown): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
