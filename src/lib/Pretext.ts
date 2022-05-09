import { Merge } from 'ts-toolbelt/out/Object/Merge';

import { isFunction } from '../helpers/isFunction';

import { PretextConfigReducersT } from './reducers/configReducerTypes';

/**
 * The shell of the pretext engine.
 * Internally, the intent is to stub out methods and abstract those out to helpers.
 * Why is this a class? There are certain typing patterns that might be easier and cleaner to achieve this way.
 */
export class Pretext<
  CpConfigName extends string,
  CpPretextConfigState extends object,
  CpPretextConfigReducers extends object
> {
  /**
   * The pretext name used for identification, dev tools, etc.
   */
  _configName: CpConfigName;

  /**
   * The reducer's configuration.
   * These functions are meant to be pure functions, predictable, and the only way to change state.
   */
  _configReducers: CpPretextConfigReducers = {} as CpPretextConfigReducers;

  /**
   * The internal configuration state.
   * Each prop within this state object will be wrapped in a render-friendly and reactive atom.
   */
  _configState: CpPretextConfigState = {} as CpPretextConfigState;

  /**
   * Constructor.
   * @param configName
   * @param configState
   * @param configReducer
   */
  constructor(configName: CpConfigName, configState?: CpPretextConfigState, configReducer?: CpPretextConfigReducers) {
    this._configName = configName;
    this._configState = configState ?? this._configState;
    this._configReducers = configReducer ?? this._configReducers;
  }

  /**
   * Sets the reducer's configuration.
   * @return The pretext shell enabling chaining.
   */
  configReducers<CpReducers extends PretextConfigReducersT<CpPretextConfigState>>(
    // reducers: Reducers | ((refs: { utils: CpPretextUtils }) => Reducers) // todo utils
    reducers: CpReducers | ((refs: { utils?: any }) => CpReducers)
  ) {
    this._configReducers = (isFunction(reducers)
      ? reducers({ utils: {} }) // todo utils
      : reducers) as any as CpPretextConfigReducers;

    // return re-typed Pretext (with the latest config update) for chaining
    return this as any as Pretext<CpConfigName, CpPretextConfigState, CpReducers>;
  }

  /**
   * Merges additional reducer's configuration.
   * @return The pretext shell enabling chaining.
   */
  configReducersPartial<CpReducers extends PretextConfigReducersT<CpPretextConfigState>>(
    // reducers: Reducers | ((refs: { utils: CpPretextUtils }) => Reducers) // todo utils
    reducers: CpReducers | ((refs: { utils?: any }) => CpReducers)
  ) {
    this._configReducers = {
      ...this._configReducers,
      ...(isFunction(reducers) ? reducers({ utils: {} }) : reducers), // todo utils
    };

    // return re-typed Pretext (with the latest config update) for chaining
    return this as any as Pretext<CpConfigName, CpPretextConfigState, Merge<CpPretextConfigReducers, CpReducers>>;
  }

  /**
   * Sets the internal state configuration.
   * @param state A configuration object of properties representing the internal pretext state.
   * @return The pretext shell enabling chaining.
   */
  configState<CpState extends CpPretextConfigState>(state: CpState | (() => CpState)) {
    this._configState = (isFunction(state) ? state() : state) as any as CpPretextConfigState;

    // return re-typed Pretext (with the latest config update) for chaining
    return this as any as Pretext<CpConfigName, CpState, CpPretextConfigReducers>;
  }

  /**
   * Merges additional internal state configuration.
   * @param state An object of properties representing part of the internal pretext state.
   * @return The pretext shell enabling chaining.
   */
  configStatePartial<CpState extends object>(state: CpState | (() => CpState)) {
    this._configState = {
      ...this._configState,
      ...(isFunction(state) ? state() : state),
    };

    // return re-typed Pretext (with the latest config update) for chaining
    return this as any as Pretext<CpConfigName, Merge<CpPretextConfigState, CpState>, CpPretextConfigReducers>;
  }
}
