import anyTest, { TestInterface } from 'ava';
import { expectType } from 'tsd';

import { isNotAny } from '../../helpers/isNotAny';
import { Pretext } from '../Pretext';
import { createPretext } from '../createPretext';

const test = anyTest as TestInterface<Pretext<'42OBA', { firstName: string }, Record<string, any>>>;

test.beforeEach((t) => {
  t.context = createPretext('42OBA').setStateConfig(() => ({
    firstName: 'john',
  }));
});

test(`call setStateConfig(() => state) and ensure internal config types and values are set correctly [J8G7V]`, (t) => {
  const pretext = t.context;
  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext);
  isNotAny(pretext._stateConfig);
  isNotAny(pretext._stateConfig.firstName);
  expectType<{ firstName: string }>(pretext._stateConfig);
  expectType<string>(pretext._stateConfig.firstName);

  t.is(pretext._stateConfig.firstName, 'john');
});

test(`call setStateConfig(state) and ensure internal config types and values are set correctly [ZG13U]`, (t) => {
  const pretext = createPretext('ZG13U').setStateConfig({
    firstName: 'jane',
  });

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext._stateConfig.firstName);
  expectType<{ firstName: string }>(pretext._stateConfig);
  expectType<string>(pretext._stateConfig.firstName);

  t.is(pretext._stateConfig.firstName, 'jane');
});
