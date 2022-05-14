import { atom, RecoilState } from 'recoil';

import { isFunction } from '../../helpers/isFunction';
import { isPropGetter } from '../../helpers/isPropGetter';
import { globalInternalData } from '../helpers/globalInternalData';

export function processStateConfig(configStateOrFn: any | (() => any)) {
  const configState = isFunction(configStateOrFn) ? configStateOrFn() : configStateOrFn; // as any as CpPretextConfigState;
  const statePropKeys = Object.keys(configState);
  const stateAtoms: { [key: string]: RecoilState<unknown> } = {};
  const { atomCounter } = globalInternalData;

  statePropKeys.forEach((statePropKey) => {
    // if derived/computed state (via a getter)
    if (isPropGetter(configState, statePropKey)) {
      // // save reference to original selector getter to call later (with an altered this context)
      // const getterOriginal = Object.getOwnPropertyDescriptor(configState, statePropKey)?.get;
      // // create selector for derived state
      // (stateAtoms as any)[statePropKey] = selector({
      //   key: `pretext-selector-${statePropKey}-${timestampInitial}-${++atomCounter}`,
      //   get: (selectorGetHelpers) => {
      //     const proxyThisToGetter = new Proxy(
      //       {},
      //       {
      //         get(_target, statePropKey: string) {
      //           // todo - test if/else it exists as an atom
      //           return selectorGetHelpers.get(stateAtoms[statePropKey]);
      //         },
      //         set(_target, statePropKey: string, val: any) {
      //           throw new Error(
      //             `Pretext: Nope, can't write in a derived atom as attempted by prop '${statePropKey}' with value '${val}'.`
      //           );
      //         },
      //       }
      //     );
      //     // execute derived logic using a proxy to swap out an instance like 'this.counter' with recoil 'states.get(stateAtoms.counter1)'
      //     const result = getterOriginal!.apply(proxyThisToGetter!, []);
      //
      //     stateValuesLatest[statePropKey] = result;
      //     return result;
      //   },
      // });
    }
    // else primitive/basic/non-derived state
    else {
      console.log('🔥⚪', statePropKey, (configState as any)[statePropKey]);

      stateAtoms['firstName'] = atom({
        // ...configState,
        key: `pretext-atom-${statePropKey}-${atomCounter.uuid()}`,
        default: (configState as any)[statePropKey],
      });
    }
  });

  console.log('stateAtoms', stateAtoms);

  // setInterval(() => {
  //   setRecoil(stateAtoms.firstName, (getRecoil(stateAtoms.firstName) as any) + 1);
  // }, 1000);

  return {
    configState,
    stateAtoms,
  };
}
