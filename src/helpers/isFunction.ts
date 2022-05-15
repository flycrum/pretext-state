/**
 * Determines if passed in param is a function or not.
 * Note: this is an unfortunate workaround for this not working:
 * `typeof state === 'function' ? state() : state`
 * ...while this does:
 * `isFunction(state) ? state() : state,`
 * @param x
 */
export const isFunction = (x: unknown): x is Function => typeof x === 'function';

/**
 * Type as any with the exception of function.
 * Example: `GpState extends {[Key in keyof GpState]: NotFunction<GpState[Key]>},`
 */
export type NotFunction<T = any> = T extends Function
  ? `NotFunction'. If you're trying to create a derived/computed state within 'initialState' then use a getter along the lines of: 'get myComputedState() {return...}'`
  : T;
