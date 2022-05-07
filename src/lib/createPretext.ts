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
  configState: CpPretextConfigState = {} as CpPretextConfigState;

  /**
   * Sets the internal state configuration.
   * Note: this does not
   * @param state A configuration object of properties representing the internal pretext state default.
   * @return The pretext shell so it can be chainable.
   */
  setStateConfig<State extends CpPretextConfigState>(state: State | (() => State)) {
    this.configState = (isFunction(state) ? state() : state) as any as CpPretextConfigState;
    return this as any as Pretext<State>;
  }
}

/**
 * Create the chainable shell of the pretext system.
 */
export function createPretext() {
  return new Pretext();
}
