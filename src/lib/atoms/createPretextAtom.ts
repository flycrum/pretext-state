import { proxy } from 'valtio';

import { globalInternalData } from '../helpers/globalInternalData';

import type { PretextAtomConfigI, PretextAtomI } from './pretextAtomTypes';

const { atomCounter } = globalInternalData;

/**
 * Creator for an individual atom wrapper.
 * @param atomConfig
 */
export function createPretextAtom(atomConfig: PretextAtomConfigI): PretextAtomI {
  const { initialValue } = atomConfig;
  type ValueT = typeof initialValue;
  const atomRef = proxy({ value: initialValue });

  return {
    atomRef,
    getValue() {
      return atomRef.value;
    },
    initialValue,
    key: atomCounter.uuid(),
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
    valueStatic: initialValue,
  };
}
