import { isFunction } from '../helpers/isFunction';

import { Pretext } from './Pretext';

/**
 * Creates a chainable instance of Pretext.
 * @param configState
 */
export function createPretext<CpConfigState extends object>(configState?: CpConfigState | (() => CpConfigState)) {
  return new Pretext<CpConfigState>(isFunction(configState) ? configState() : configState);
}
