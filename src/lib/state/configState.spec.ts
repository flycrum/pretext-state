import anyTest, { TestInterface } from 'ava';
import { expectType } from 'tsd';

import { isNotAny } from '../../helpers/isNotAny';
import { Pretext } from '../Pretext';
import { createPretext } from '../createPretext';

const test = anyTest as TestInterface<Pretext<'42OBA', { firstName: string }, Record<string, any>>>;

test.beforeEach((t) => {
  t.context = createPretext('42OBA').configState(() => ({
    firstName: 'john',
  }));
});

test('call configState(() => state) and ensure internal _config types and values are set correctly [J8G7V]', (t) => {
  const pretext = t.context;
  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext);
  isNotAny(pretext._configState);
  isNotAny(pretext._configState.firstName);
  expectType<{ firstName: string }>(pretext._configState);
  expectType<string>(pretext._configState.firstName);

  t.is(pretext._configState.firstName, 'john');
});

test('call configState(state) and ensure internal _config types and values are set correctly [ZG13U]', (t) => {
  const pretext = createPretext('ZG13U').configState({
    firstName: 'jane',
  });

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext._configState.firstName);
  expectType<{ firstName: string }>(pretext._configState);
  expectType<string>(pretext._configState.firstName);

  t.is(pretext._configState.firstName, 'jane');
});
