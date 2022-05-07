import anyTest, { TestInterface } from 'ava';
import { expectType } from 'tsd';

import { isNotAny } from '../helpers/isNotAny';

import { createPretext, Pretext } from './createPretext';

/**
 * https://www.random.org/strings/?num=10&len=5&digits=on&upperalpha=on&unique=on&format=html&rnd=new
 */

// const test = anyTest as TestInterface<{
//   sort: (a: string, b: string) => number;
// }>;

const test = anyTest as TestInterface<Pretext<{ firstName: string }>>;

test.beforeEach((t) => {
  // eslint-disable-next-line functional/immutable-data
  t.context = createPretext().initState(() => ({
    firstName: 'john',
  }));
});

test('call initState(() => state) and ensure types and values are correct [J8G7V]', (t) => {
  const pretext = t.context;
  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext);
  isNotAny(pretext.configState);
  isNotAny(pretext.configState.firstName);
  expectType<{ firstName: string }>(pretext.configState);
  expectType<string>(pretext.configState.firstName);

  t.is(pretext.configState.firstName, 'john');
});

test('call initState(state) and ensure types and values are correct [ZG13U]', (t) => {
  const pretext = createPretext().initState({
    firstName: 'jane',
  });

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext);
  isNotAny(pretext.configState);
  isNotAny(pretext.configState.firstName);
  expectType<{ firstName: string }>(pretext.configState);
  expectType<string>(pretext.configState.firstName);

  t.is(pretext.configState.firstName, 'jane');
});

// test('initState re-initializes types and values correctly [EN5CW]', (t) => {
//   const pretext = t.context;
//
//   pretext.initState(() => ({
//     firstName: 'jane',
//     age: 30,
//   }));
//
//   // typings (while these can't truly be tested, running test suite will fail if typings break)
//   isNotAny(pretext);
//   isNotAny(pretext.configState);
//   isNotAny(pretext.configState.firstName);
//   expectType<{ firstName: string }>(pretext.configState);
//   expectType<string>(pretext.configState.firstName);
//
//   t.is(pretext.configState.firstName, 'jane');
//   // t.is(pretext.configState.age, 30);
// });
