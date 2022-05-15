import { proxy, useSnapshot } from 'valtio';
import { derive } from 'valtio/utils';

import { globalInternalData } from '../helpers/globalInternalData';

import type {
  PretextAtomComputedConfigI,
  PretextAtomComputedI,
  PretextAtomConfigI,
  PretextAtomI,
} from './pretextAtomTypes';

const { atomCounter } = globalInternalData;

/**
 * Creates an individual atom container with values, getters, setters, atom refs, and more.
 * @param atomConfig
 */
export function createPretextAtom(atomConfig: PretextAtomConfigI): PretextAtomI {
  const { initialValue } = atomConfig;
  type ValueT = typeof initialValue;
  const atomRef = proxy<ValueT>({ value: initialValue });

  return {
    atomRef,
    getValue() {
      return atomRef.value;
    },
    initialValue,
    key: `pretext-atom-state-${atomCounter.uuid()}`,
    setValue(valueOrFn: ValueT | ((previousValue: ValueT) => ValueT)) {
      let value: ValueT = valueOrFn;

      if (typeof valueOrFn === 'function') {
        value = valueOrFn(atomRef.value);
      }

      // update underlying atom
      atomRef.value = value;
      // update static value
      this.valueStatic = value;
    },
    useAtomValue: (thisScope: any) => {
      // inject the hook's scope into the called hook so it doesn't complain about not running in functional component
      return (useSnapshot.apply(thisScope, [atomRef]) as typeof atomRef).value;
    },
    valueStatic: initialValue,
  };
}

/**
 * Creates for a derived/computed atom container object.
 * @param stateAtoms
 * @param atomConfig
 */
export function createPretextAtomComputed(
  stateAtoms: { [key: string]: PretextAtomI<unknown> | PretextAtomComputedI }, // todo better typing
  atomConfig: PretextAtomComputedConfigI
): PretextAtomComputedI {
  const { computedFn } = atomConfig;

  type GetAtomStateOrComputedAtomRefT = typeof stateAtoms[0]['atomRef'];

  // https://valtio.pmnd.rs/docs/utils/derive
  const atomRef = derive({
    value: (get: (atomRef: GetAtomStateOrComputedAtomRefT) => typeof atomRef) => {
      // create 'this' proxy that transforms easier references like 'this.count' into underlying 'get(countAtom)'
      const thisProxyAccessGet = new Proxy(
        {},
        {
          get(_target, stateName: string) {
            // todo - test if/else it exists as an atom
            return get(stateAtoms[stateName].atomRef).value;
          },
          set(_target, stateName: string, val: any) {
            // eslint-disable-next-line functional/no-throw-statement
            throw new Error(
              `Pretext: Nope, can't write in a derived atom as attempted by prop '${stateName}' with value '${val}'.`
            );
          },
        }
      );

      // execute derived logic using a proxy to swap out an instance like 'this.counter' with 'get(stateAtoms.counter1)'
      // also pass 'state' object so computed function that doesn't have access to 'this' can still use state atoms
      return computedFn.apply(thisProxyAccessGet, [{ state: thisProxyAccessGet }]);
    },
  });

  return {
    atomRef,
    getValue() {
      return atomRef.value; // todo: value or value.value ???
    },
    key: `pretext-atom-computed-${atomCounter.uuid()}`,
    useAtomValue: (thisScope: any) => {
      // inject the hook's scope into the called hook so it doesn't complain about not running in functional component
      return (useSnapshot.apply(thisScope, [atomRef]) as typeof atomRef).value;
    },
    // valueStatic: initialValue,
  };
}
