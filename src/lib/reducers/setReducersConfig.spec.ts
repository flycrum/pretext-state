import anyTest, { TestInterface } from 'ava';
import { expectType } from 'tsd';

import { expectTypeParam0, expectTypeParam1 } from '../../helpers/expectTypes';
import { isNotAny } from '../../helpers/isNotAny';
import { createPretext } from '../createPretext';

function generatePretextFactory() {
  return createPretext('DKVOX', {
    firstName: 'javant',
  });
}

const test = anyTest as TestInterface<ReturnType<typeof generatePretextFactory>>;

test.beforeEach((t) => {
  t.context = generatePretextFactory();
});

test(`set reducers via setReducersConfig(() => reducers) and ensure internal config types and values are set correctly [AUFC6]`, (t) => {
  const pretext = t.context.setReducersConfig(() => ({
    changeName(state, newName: string) {
      state.firstName = newName;
      this.secondCallAllCaps(state);
      return newName; // return this here only as a means to test 'isNotAny' and ensure type is maintained
    },
    secondCallAllCaps: (state) => {
      state.firstName = state.firstName.toUpperCase();
    },
  }));

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext._stateConfig.firstName);
  expectType<{ firstName: string }>(pretext._stateConfig);
  expectType<string>(pretext._stateConfig.firstName);

  isNotAny(pretext._reducersConfig);
  isNotAny(pretext._reducersConfig.changeName);
  expectType<{ changeName(state: { firstName: string }, newName: string): void }>(pretext._reducersConfig);
  expectTypeParam0<{ firstName: string }>(pretext._reducersConfig.changeName);
  expectTypeParam1<string>(pretext._reducersConfig.changeName);
  isNotAny(pretext._reducersConfig.secondCallAllCaps);
  expectType<{ secondCallAllCaps(state: { firstName: string }, newName: string): void }>(pretext._reducersConfig);
  expectTypeParam0<{ firstName: string }>(pretext._reducersConfig.secondCallAllCaps);
  expectTypeParam1<undefined>(pretext._reducersConfig.secondCallAllCaps);

  t.is(pretext._stateConfig.firstName, 'javant'); // todo this should change once wired up
  t.is(Object.keys(pretext._reducersConfig).length, 2);
});
