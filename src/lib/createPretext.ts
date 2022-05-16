import { isFunction, NotFunction } from '../helpers/isFunction';

import { Pretext } from './Pretext';
import type { PretextCreateZzzConfigZzzReducersT } from './reducers/reducerTypes';

/**
 * Creates a chainable instance of Pretext.
 * Initially, only name, state, and reducers can be set as that's the most basic/common set and anymore more gets substantially more complicated in terms of typings.
 * @param pretextName The pretext name used for identification, dev tools, etc.
 * @param initialState The initial state config or function to generate that state.
 * @param reducers The initial reducers config or function to generate them.
 */
export function createPretext<
  // these generic params used to enforce passed-in types and adhere to expected interface/type guardrails
  PgpCreateName extends string,
  PgpCreateState extends {
    // limit state values to non-functions
    [Key in keyof PgpCreateState]: NotFunction<PgpCreateState[Key]>;
  },
  PgpCreateReducers extends PretextCreateZzzConfigZzzReducersT<PgpCreateState>
>(
  pretextName: PgpCreateName,
  initialState?: PgpCreateState | (() => PgpCreateState),
  reducers?: PgpCreateReducers | (() => PgpCreateReducers)
) {
  return new Pretext<PgpCreateName, PgpCreateState, PgpCreateReducers>(
    pretextName,
    isFunction(initialState) ? initialState() : initialState,
    isFunction(reducers) ? reducers() : reducers
  );
}
