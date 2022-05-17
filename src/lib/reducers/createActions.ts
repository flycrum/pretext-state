import { PretextC } from '../PretextC';

import type { PretextActionsT } from './actionTypes';
import type { PretextCreateConfigReducersT } from './reducerTypes';

export function createActions<
  PgpPretextName extends string,
  PgpPretextState extends object,
  PgpPretextReducers extends PretextCreateConfigReducersT<PgpPretextState>
>(pretext: PretextC<PgpPretextName, PgpPretextState, PgpPretextReducers>) {
  // note: '_stateAtoms' has not been set prior to this
  // const { _stateAtoms } = pretext;

  const stateActionProxy = new Proxy(
    {},
    {
      get(_target, stateName: string) {
        const { _stateAtoms } = pretext;
        const stateNameKey = stateName as keyof typeof _stateAtoms;

        // eslint-disable-next-line no-prototype-builtins
        if (_stateAtoms.hasOwnProperty(stateNameKey)) {
          return _stateAtoms[stateNameKey].getValue();
        } else {
          console.warn(
            `Pretext.action: The state ${stateNameKey} does not exist on this atom and therefore 'get' won't work.`
          );
          return undefined;
        }
      },
      set(_target, stateName: string, val: any) {
        const { _stateAtoms } = pretext;
        const stateNameKey = stateName as keyof typeof _stateAtoms;

        // eslint-disable-next-line no-prototype-builtins
        if (_stateAtoms.hasOwnProperty(stateNameKey)) {
          // const previousValue = pretext._stateAtoms[stateNameKey];
          // stateValuesLatest[stateName] = val;
          _stateAtoms[stateNameKey].setValue(val);
          // devtools.send(`${actionName}.${stateNameKey}`, stateValuesLatest, {
          //   previousState: previousValue,
          //   currentState: val,
          // });
          return true;
        } else {
          console.warn(
            `Pretext.action: The state ${stateNameKey} does not exist on this atom and therefore can't be 'set'.`
          );
          return false;
        }
      },
    }
  );

  // use proxy here and directly reference pretext data on each access request that we ensure we always have the most recent refs
  return new Proxy({ hello: 0 } as any, {
    get(_target, stateName: string) {
      return (...args: any[]) => {
        // could look into populating proxy with current values??
        // https://stackoverflow.com/questions/61765782/javascript-proxy-how-to-hide-target-and-handler-in-console-and-debug

        pretext._reducersConfig[stateName](stateActionProxy as any, ...args);
      };
    },
    set() {
      // eslint-disable-next-line functional/no-throw-statement
      throw new Error(`Pretext: Can't overwrite actions.`);
    },
  }) as PretextActionsT<PgpPretextState, PgpPretextReducers>;
}
