import { Merge } from 'ts-toolbelt/out/Object/Merge';

import { isFunction } from '../helpers/isFunction';

/**
 * The internals of the pretext engine.
 * Why is this a class? There are certain typing patterns that are easier and cleaner to achieve this way.
 */
export class Pretext<CpPretextConfigState extends object> {
  /**
   * The internal configuration state.
   * Each prop within this state object will be wrapped in a render-friendly and reactive atom.
   */
  _configState: CpPretextConfigState = {} as CpPretextConfigState;

  constructor(configState?: CpPretextConfigState) {
    this._configState = configState ?? this._configState;
  }

  /**
   * Sets the internal state configuration.
   * @param state A configuration object of properties representing the internal pretext state.
   * @return The pretext shell enabling chaining.
   */
  configState<State extends CpPretextConfigState>(state: State | (() => State)) {
    this._configState = (isFunction(state) ? state() : state) as any as CpPretextConfigState;
    return this as any as Pretext<State>;
  }

  /**
   * Merges additional internal state configuration.
   * @param state An object of properties representing part of the internal pretext state.
   * @return The pretext shell enabling chaining.
   */
  configPartialState<State extends object>(state: State | (() => State)) {
    this._configState = {
      ...this._configState,
      ...(isFunction(state) ? state() : state),
    };

    return this as any as Pretext<Merge<CpPretextConfigState, State>>;
  }
}
