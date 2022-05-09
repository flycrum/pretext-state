import { isFunction } from '../helpers/isFunction';

import { Pretext } from './Pretext';
import type { PretextConfigReducersT } from './reducers/configReducerTypes';

/**
 * Creates a chainable instance of Pretext.
 * @param configName The pretext name used for identification, dev tools, etc.
 * @param configState The state data.
 * @param configReducers
 */
export function createPretext<
  CpName extends string,
  CpState extends object,
  CpReducers extends PretextConfigReducersT<CpState>
>(configName: CpName, configState?: CpState | (() => CpState), configReducers?: CpReducers | (() => CpReducers)) {
  return new Pretext<CpName, CpState, CpReducers>(
    configName,
    isFunction(configState) ? configState() : configState,
    isFunction(configReducers) ? configReducers() : configReducers
  );
}
