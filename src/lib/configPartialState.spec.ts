import anyTest, { TestInterface } from 'ava';
import { expectType } from 'tsd';

import { isNotAny } from '../helpers/isNotAny';

import { Pretext } from './Pretext';
import { createPretext } from './createPretext';

const test = anyTest as TestInterface<Pretext<{ firstName: string }>>;

test.beforeEach((t) => {
  // eslint-disable-next-line functional/immutable-data
  t.context = createPretext().configState(() => ({
    firstName: 'jimmy',
  }));
});

test('append more state via configPartialState and ensure internal _config types and values are set correctly [EN5CW]', (t) => {
  const pretext = t.context.configPartialState({
    age: 99,
  });

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext._configState.firstName);
  isNotAny(pretext._configState.age);
  expectType<{ firstName: string; age: number }>(pretext._configState);
  expectType<string>(pretext._configState.firstName);
  expectType<number>(pretext._configState.age);

  t.is(pretext._configState.firstName, 'jimmy');
  t.is(pretext._configState.age, 99);
});
