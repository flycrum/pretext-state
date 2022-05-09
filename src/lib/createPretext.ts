import { isFunction } from '../helpers/isFunction';

import { Pretext } from './Pretext';

/**
 * Creates a chainable instance of Pretext.
 * @param configName The pretext name used for identification, dev tools, etc.
 * @param configState The state data.
 */
export function createPretext<CpConfigName extends string, CpConfigState extends object>(
  configName: CpConfigName,
  configState?: CpConfigState | (() => CpConfigState)
) {
  return new Pretext<CpConfigName, CpConfigState>(configName, isFunction(configState) ? configState() : configState);
}
