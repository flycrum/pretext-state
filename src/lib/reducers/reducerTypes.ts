/**
 * Reducer function type.
 */
// export type PretextConfigReducersItemT<PgpState> = (state: PgpState, ...args: any[]) => any;
// export type PretextConfigReducersItemT<PgpState, F = any> = F extends (x: any, ...args: infer P) => infer R
//   ? (state: PgpState, ...args: P) => R
//   : never;
//
export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
export type InsertFirstArg<Arg0, F> = F extends (...args: infer P) => infer R ? (state: Arg0, ...args: P) => R : never;
// export type JunkUpFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

// type CaseReducer<S = any, A extends (state: any) => any = any> = (state: S, action: A) => S | void;
// type CaseReducer<S = any, F extends (state: any) => any = any> = (state: S, action: F) => S | void;

/**
 * The final typed k/v of reducers (with proper types when referencing).
 * Note: this is needed and is different than that of the config type that's used to enforce types and type 'state' within definition.
 */
// export type PretextFinalReducersT<PgpState, PgpReducers> = {
export type PretextFinalReducersT<PgpPretextState, PgpReducers> = {
  // [Key in keyof PgpReducers]: PretextConfigReducersItemT<PgpState>;
  // [Key in keyof PgpReducers]: PgpReducers[Key];
  // [Key in keyof PgpReducers]: (state: PgpState, ...args: Parameters<PgpReducers[Key]>) => ReturnType<PgpReducers[Key]>;
  // [Key in keyof PgpReducers]: JunkUpFirstArg<PgpReducers[Key]>;
  // [Key in keyof PgpReducers]: (state: PgpState, ...args: PgpReducers[Key][]) => ReturnType<PgpReducers[Key]>;
  // [Key in keyof PgpReducers]: (...args: Parameters<PgpReducers[Key]>) => ReturnType<PgpReducers[Key]>;
  // [K: string]: CaseReducer<PgpState>;
  // [Key in keyof PgpReducers]: CaseReducer<PgpState, PgpReducers[Key]>;
  // [Key in keyof PgpReducers]: OmitFirstArg<PgpReducers[Key]>;
  // [Key in keyof PgpReducers]: PgpReducers[Key];

  // this has been stupid finicky to swap out the potentially old state (due to chaining) and replace with new state
  // note: stagnant state for first reducer param can happen because reducer was defined and then 'addMoreStateConfigs' call with additional state fields
  // note: not sure why 'any' works here but not worth fighting right now since it appears to be typing state correctly
  // [Key in keyof PgpReducers]: InsertFirstArg<any, OmitFirstArg<PgpReducers[Key]>>;
  [Key in keyof PgpReducers]: InsertFirstArg<PgpPretextState, OmitFirstArg<PgpReducers[Key]>>;
};

// export type PretextConfigReducersT<PgpState, PgpReducers> = Record<
//   string,
//   PretextCreateZzzConfigReducersZzzItemT<PgpState>
// >;

// /**
//  * Reducer function type.
//  */
// export type PretextCreateZzzConfigReducersZzzItemT<PgpState> = (state: PgpState, ...args: any[]) => any;

/**
 * Config type for reducers used to enforce structure while also typing 'state' param correctly within definition.
 */
export type PretextCreateConfigReducersT<PgpState> = Record<string, (state: PgpState, ...args: any[]) => any>;
