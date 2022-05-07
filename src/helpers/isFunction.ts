/**
 * Determines if passed in param is a function or not.
 * Note: this is an unfortunate workaround for this not working:
 * `typeof state === 'function' ? state() : state`
 * ...while this does:
 * `isFunction(state) ? state() : state,`
 * @param x
 */
export const isFunction = (x: unknown): x is Function => typeof x === 'function';
