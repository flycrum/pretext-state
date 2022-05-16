/**
 * Reducer function type.
 */
// export type PretextConfigReducersItemT<PgpState> = (state: PgpState, ...args: any[]) => any;
export type PretextConfigReducersItemT<PgpState, F = any> = F extends (x: any, ...args: infer P) => infer R
  ? (state: PgpState, ...args: P) => R
  : never;

// export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

/**
 * Object of reducer types.
 * Need to pass in the actual reducer's object generic param b/c we need to be able to merge newly added configs.
 */
export type PretextConfigReducersT<
  PgpState,
  PgpReducers extends { [key: string]: (...args: never) => unknown } = any
> = {
  // [Key in keyof PgpReducers]: PretextConfigReducersItemT<PgpState>;
  // [Key in keyof PgpReducers]: (state: PgpState, ...args: Parameters<PgpReducers[Key]>) => ReturnType<PgpReducers[Key]>;
  [Key in keyof PgpReducers]: PretextConfigReducersItemT<PgpState, PgpReducers[Key]>;
};

/**
 * Reducer function type.
 */
export type PretextCreateZzzConfigReducersZzzItemT<PgpState> = (state: PgpState, ...args: any[]) => any;

/**
 * Inferred record of reducers instead of explicit with looping over.
 * Note: this is because 'createPretext' can't handle the more explicit 'Key in keyof Reducers' approach needed for dynamic configs.
 */
export type PretextCreateZzzConfigZzzReducersT<PgpState> = Record<
  string,
  PretextCreateZzzConfigReducersZzzItemT<PgpState>
>;
