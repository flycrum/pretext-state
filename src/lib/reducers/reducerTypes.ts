/**
 * Reducer function type.
 */
export type PretextConfigReducersItemT<PgpState> = (state: PgpState, ...args: any[]) => any;

/**
 * Object of reducer types.
 */
export type PretextConfigReducersT<PgpState> = Record<string, PretextConfigReducersItemT<PgpState>>;
