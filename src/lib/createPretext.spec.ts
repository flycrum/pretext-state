import test from 'ava';
import { expectType } from 'tsd';

import { expectTypeParam0, expectTypeParam1 } from '../helpers/expectTypes';
import { isNotAny } from '../helpers/isNotAny';

import { createPretext } from './createPretext';

/**
 * https://www.random.org/strings/?num=10&len=5&digits=on&upperalpha=on&unique=on&format=html&rnd=new
 */

test('call createPretext() with empty state and ensure default types and values are set correctly [KC91I]', (t) => {
  const pretext = createPretext('KC91I');

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext);
  isNotAny(pretext._configName);
  expectType<string>(pretext._configName);
  isNotAny(pretext._configState);
  expectType<object>(pretext._configState);

  t.is(pretext._configName, 'KC91I');
  t.is(Object.keys(pretext._configState).length, 0);
  t.is(Object.keys(pretext._configReducers).length, 0);
});

test('call createPretext(state, () => reducers) to ensure types and values are set correctly [3DIZB]', (t) => {
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
  isNotAny(pretext._configState.firstName);
  expectType<{ firstName: string }>(pretext._configState);
  expectType<string>(pretext._configState.firstName);

  isNotAny(pretext._configReducers);
  isNotAny(pretext._configReducers.changeName);
  expectType<{ changeName(state: { firstName: string }, newName: any): void }>(pretext._configReducers);
  expectType<(state: { firstName: string }, newName: string) => void>(pretext._configReducers.changeName);
  expectTypeParam0<{ firstName: string }>(pretext._configReducers.changeName);
  expectTypeParam1<string>(pretext._configReducers.changeName);
  isNotAny(pretext._configReducers.changeName({ firstName: '' }, 'abc' as any));

  t.is(pretext._configName, '3DIZB');
  t.is(pretext._configState.firstName, 'jones'); // todo this should change once wired up
  t.is(Object.keys(pretext._configReducers).length, 1);
});
