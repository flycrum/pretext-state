import test from 'ava';
import { expectType } from 'tsd';

import { expectTypeParam0, expectTypeParam1 } from '../helpers/expectTypes';
import { isNotAny } from '../helpers/isNotAny';

import { createPretext } from './createPretext';

/**
 * https://www.random.org/strings/?num=10&len=5&digits=on&upperalpha=on&unique=on&format=html&rnd=new
 */

test(`call createPretext() with empty state and ensure default types and values are set correctly [KC91I]`, (t) => {
  const pretext = createPretext('KC91I');

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext);
  isNotAny(pretext._name);
  expectType<string>(pretext._name);
  isNotAny(pretext._stateConfig);
  expectType<object>(pretext._stateConfig);

  t.is(pretext._name, 'KC91I');
  t.is(Object.keys(pretext._stateConfig).length, 0);
  t.is(Object.keys(pretext._reducersConfig).length, 0);
});

test(`call createPretext(state, () => reducers) to ensure types and values are set correctly [3DIZB]`, (t) => {
  const pretext = createPretext(
    '3DIZB',
    {
      firstName: 'jones',
    },
    () => ({
      changeName(state, newName: string) {
        state.firstName = newName;
        return newName; // return this here only as a means to test 'isNotAny' and ensure type is maintained
      },
    })
  );

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext._stateConfig.firstName);
  expectType<{ firstName: string }>(pretext._stateConfig);
  expectType<string>(pretext._stateConfig.firstName);

  isNotAny(pretext._reducersConfig);
  isNotAny(pretext._reducersConfig.changeName);
  expectType<{ changeName(state: { firstName: string }, newName: any): void }>(pretext._reducersConfig);
  expectType<(state: { firstName: string }, newName: string) => void>(pretext._reducersConfig.changeName);
  expectTypeParam0<{ firstName: string }>(pretext._reducersConfig.changeName);
  expectTypeParam1<string>(pretext._reducersConfig.changeName);
  isNotAny(pretext._reducersConfig.changeName({ firstName: '' }, 'abc' as any));

  t.is(pretext._name, '3DIZB');
  t.is(pretext._stateConfig.firstName, 'jones'); // todo this should change once wired up
  t.is(Object.keys(pretext._reducersConfig).length, 1);
});
