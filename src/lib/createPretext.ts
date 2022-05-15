import { isFunction, NotFunction } from '../helpers/isFunction';

import { Pretext } from './Pretext';
import type { PretextConfigReducersT } from './reducers/configReducerTypes';

/**
 * Creates a chainable instance of Pretext.
 * @param configName The pretext name used for identification, dev tools, etc.
 * @param configState The state data.
 * @param configReducers
 */
export function createPretext<
  // these generic params used to enforce passed-in types and adhere to expected interface/type guardrails
  CpName extends string,
  CpState extends {
    [Key in keyof CpState]: ((refs: { state: { [Key in keyof CpState]: unknown } }) => any) | NotFunction<CpState[Key]>;
  },
  CpReducers extends PretextConfigReducersT<CpState>
>(configName: CpName, configState?: CpState | (() => CpState), configReducers?: CpReducers | (() => CpReducers)) {
  return new Pretext<CpName, CpState, CpReducers>(
    configName,
    isFunction(configState) ? configState() : configState,
    isFunction(configReducers) ? configReducers() : configReducers
  );
}
