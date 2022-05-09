/**
 * Reducer function type.
 */
export type PretextConfigReducersItemT<CpState> = (state: CpState, ...args: any[]) => any;

/**
 * Object of reducer types.
 */
export type PretextConfigReducersT<CpState> = Record<string, PretextConfigReducersItemT<CpState>>;
