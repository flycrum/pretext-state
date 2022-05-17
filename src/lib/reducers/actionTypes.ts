/**
 * Action type that changes the reducer signature.
 */
export type PretextActionsItemT<PgpState, F = any> = F extends (x: PgpState, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;

/**
 * Object of actions.
 * Need to pass in the actual reducer's object generic param b/c we need to be able to merge newly added configs.
 */
export type PretextActionsT<PgpState, PgpReducers extends { [key: string]: (...args: never) => unknown } = any> = {
  [Key in keyof PgpReducers]: PretextActionsItemT<PgpState, PgpReducers[Key]>;
};
