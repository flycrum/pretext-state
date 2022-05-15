import { isFunction } from '../../helpers/isFunction';
import { createPretextAtom, createPretextAtomComputed } from '../atoms/createPretextAtom';
import type { PretextAtomComputedI, PretextAtomI } from '../atoms/pretextAtomTypes';

export function processStateOrFnConfig(configStateOrFn: any | (() => any)) {
  const configState = isFunction(configStateOrFn) ? configStateOrFn() : configStateOrFn; // as any as CpPretextConfigState;
  const statePropKeys = Object.keys(configState);
  const stateAtoms: { [key: string]: PretextAtomI<unknown> | PretextAtomComputedI } = {}; // todo better typing

  statePropKeys.forEach((statePropKey) => {
    // if derived/computed state
    if (isFunction(configState[statePropKey])) {
      // create selector for derived state
      stateAtoms[statePropKey] = createPretextAtomComputed(stateAtoms, {
        computedFn: configState[statePropKey],
      });
    }
    // else primitive/basic/non-derived state
    else {
      // isPropGetter(configState, statePropKey)
      // // save reference to original selector getter to call later (with an altered this context)
      // const getterOriginal = Object.getOwnPropertyDescriptor(configState, statePropKey)?.get;

      stateAtoms[statePropKey] = createPretextAtom({
        initialValue: configState[statePropKey],
      });
    }
  });

  return {
    configState,
    stateAtoms,
  };
}
