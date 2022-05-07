import { isFunction } from '../helpers/isFunction';

/**
 * The internals of the pretext engine.
 * Why is this a class? There are certain typing patterns that are easier to achieve this way.
 */
class Pretext<CpPretextState extends object> {
  /**
   * The internal state.
   * Each prop within this state object will be wrapped in a render-friendly and reactive atom.
   */
  state: CpPretextState = {} as CpPretextState;

  /**
   * Sets the internal state.
   * Note: this does not
   * @param state An object of properties representing the internal pretext state.
   * @return The pretext shell so it can be chainable.
   */
  setState<State extends object>(state: State | (() => State)) {
    this.state = (isFunction(state) ? state() : state) as any as CpPretextState;
    return this as any as Pretext<State>;
  }
}

/**
 * Create the chainable shell of the pretext system.
 */
export function createPretext() {
  return new Pretext();
}
