/**
 * Removes specified keys from an object and returns a new object.
 *
 * @param {Object} obj - The source object from which keys are to be omitted.
 * @param {Array} keysToOmit - An array of string keys that should be omitted from the source object.
 * @returns {Object} A new object with the specified keys omitted.
 *
 * @example
 * // Suppose you have a user object and you want to omit the 'password' field:
 * const user = {
 *   username: 'john_doe',
 *   password: '12345',
 *   email: 'john@example.com'
 * };
 * const sanitizedUser = omit(user, ['password']);
 * // The 'sanitizedUser' will be:
 * // {
 * //   username: 'john_doe',
 * //   email: 'john@example.com'
 * // }
 */

export function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const ret: Partial<T> = { ...obj };
  keys.forEach((key) => {
    delete ret[key];
  });
  return ret as Omit<T, K>;
}
