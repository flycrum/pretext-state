import type { Merge } from 'ts-toolbelt/out/Object/Merge';

import { isFunction } from '../helpers/isFunction';

import type { PretextAtomI } from './atoms/pretextAtomTypes';
import type { PretextConfigReducersT } from './reducers/reducerTypes';
import { processStateOrFnConfig } from './state/processStateOrFnConfig';

/**
 * The shell of the pretext engine.
 * Internally, the intent is to stub out methods and abstract those out to helpers.
 * Why is this a class? There are certain typing patterns that might be easier and cleaner to achieve this way.
 */
export class Pretext<
  PgpPretextName extends string,
  PgpPretextState extends object,
  PgpPretextReducers extends PretextConfigReducersT<PgpPretextState>
> {
  /**
   * The pretext name used for identification, dev tools, etc.
   */
  _name: PgpPretextName;

  /**
   * The reducer's configuration.
   * These functions are meant to be pure functions, predictable, and the only way to change state.
   */
  _reducersConfig: PgpPretextReducers = {} as PgpPretextReducers;

  /**
   * The internal configuration state.
   * Each prop within this state object will be wrapped in a render-friendly and reactive atom.
   */
  _stateConfig: PgpPretextState = {} as PgpPretextState;

  /**
   * Each state prop as represented by individual atoms generated from configs.
   */
  _stateAtoms: { [Key in keyof PgpPretextState]: PretextAtomI<PgpPretextState[Key]> } = {} as any;

  /**
   * Constructor.
   * @param name
   * @param stateConfig
   * @param reducersConfig
   */
  constructor(name: PgpPretextName, stateConfig?: PgpPretextState, reducersConfig?: PgpPretextReducers) {
    this._name = name;
    this.setStateConfig(stateConfig ?? this._stateConfig);
    this.setReducersConfig(reducersConfig ?? this._reducersConfig);
  }

  /**
   * Merges additional reducer's configuration with any existing reducers.
   * @return The pretext shell enabling chaining.
   */
  addMoreReducerConfigs<PgpAddReducers extends PretextConfigReducersT<PgpPretextState>>(
    // reducers: Reducers | ((refs: { utils: CpPretextUtils }) => Reducers) // todo utils
    reducers: PgpAddReducers | ((refs: { utils?: any }) => PgpAddReducers)
  ) {
    this._reducersConfig = {
      ...this._reducersConfig,
      ...(isFunction(reducers) ? reducers({ utils: {} }) : reducers), // todo utils
    };

    // return re-typed Pretext (with the latest config update) for chaining
    return this as any as Pretext<PgpPretextName, PgpPretextState, Merge<PgpPretextReducers, PgpAddReducers>>;
  }

  /**
   * Merges additional state configuration with any existing state.
   * @param state An object of properties representing part of the internal pretext state.
   * @return The pretext shell enabling chaining.
   */
  // addMoreStateConfigs<GpgAddState extends object>(stateOrFn: GpgAddState | (() => GpgAddState)) {
  //   this._configState = {
  //     ...this._configState,
  //     ...(isFunction(stateOrFn) ? stateOrFn() : stateOrFn),
  //   };
  //
  //   type MergedStateT = Merge<CpPretextConfigState, GpgAddState>;
  //   // todo - typings off...almost need to remap reducer records for new, merged state
  //   type ReducersT = Merge<CpPretextConfigReducers, PretextConfigReducersT<MergedStateT>>;
  //
  //   // return re-typed Pretext (with the latest config update) for chaining
  //   return this as any as Pretext<CpConfigName, MergedStateT, ReducersT>;
  // }

  /**
   * Sets the reducer's configuration (this will override existing state and typings).
   * @return The pretext shell enabling chaining.
   */
  setReducersConfig<PgpSetReducers extends PretextConfigReducersT<PgpPretextState>>(
    // reducers: Reducers | ((refs: { utils: CpPretextUtils }) => Reducers) // todo utils
    reducers: PgpSetReducers | ((refs: { utils?: any }) => PgpSetReducers)
  ) {
    this._reducersConfig = (isFunction(reducers)
      ? reducers({ utils: {} }) // todo utils
      : reducers) as any as PgpPretextReducers;

    // return re-typed Pretext (with the latest config update) for chaining
    return this as any as Pretext<PgpPretextName, PgpPretextState, PgpSetReducers>;
  }

  /**
   * Sets the internal state configuration (this will override existing state and typings).
   * @param stateOrFn A configuration object or function wrapper of properties representing pretext state.
   * @return The pretext shell enabling chaining.
   */
  setStateConfig<PgpSetState extends PgpPretextState>(stateOrFn: PgpSetState | (() => PgpSetState)) {
    const { configState, stateAtoms } = processStateOrFnConfig(stateOrFn);

    this._stateConfig = configState;
    this._stateAtoms = stateAtoms as any;

    // return re-typed Pretext (with the latest config update) for chaining
    return this as any as Pretext<PgpPretextName, PgpSetState, PgpPretextReducers>;
  }

  /**
   * Hook that gets the resulting pretext state, actions, etc.
   */
  usePretextFallout() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisScope = this;
    const stateAtoms = this._stateAtoms;

    const proxyToDetectDestructuresAndBackfillWithHooksAccessingThoseStates = new Proxy(
      {},
      {
        get(_target, stateOrActionName: string) {
          const statePropKey: keyof PgpPretextState = stateOrActionName as any;

          // if ((actions as any)[stateOrActionName]) {
          //   return (actions as any)[stateOrActionName];
          // }

          // call and inject the original functional scope into the hook
          // this is so it doesn't complain about the context it's running in since this isn't a functional component
          return stateAtoms[statePropKey].useAtomValue(thisScope);
        },
        set(_target, propName: string, val: any) {
          // eslint-disable-next-line functional/no-throw-statement
          throw new Error(
            `Pretext.usePretextFallout: Nope, can't write to an atom here, as attempted by prop '${propName}' with value '${val}'.`
          );
        },
      }
    );

    return proxyToDetectDestructuresAndBackfillWithHooksAccessingThoseStates as any as PgpPretextState;
  }
}
