import test from 'ava';
import { expectType } from 'tsd';

import { isNotAny } from '../helpers/isNotAny';

import { createPretext } from './createPretext';

/**
 * https://www.random.org/strings/?num=10&len=5&digits=on&upperalpha=on&unique=on&format=html&rnd=new
 */

test('call createPretext() with NO state and ensure default types and values are set correctly [KC91I]', (t) => {
  const pretext = createPretext();

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext);
  isNotAny(pretext._configState);
  expectType<object>(pretext._configState);

  t.is(Object.keys(pretext._configState).length, 0);
});

test('call createPretext(configState) and configPartialState() to ensure types and values are set correctly [ZIE0J]', (t) => {
  const pretext = createPretext({
    firstName: 'joy',
  }).configPartialState({
    age: 44,
  });

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext._configState.firstName);
  isNotAny(pretext._configState.age);
  expectType<{ firstName: string; age: number }>(pretext._configState);
  expectType<string>(pretext._configState.firstName);
  expectType<number>(pretext._configState.age);

  t.is(pretext._configState.firstName, 'joy');
  t.is(pretext._configState.age, 44);
});

test('call createPretext(() => configState) and configPartialState(() => configState) to ensure types and values are set correctly [PF3JV]', (t) => {
  const pretext = createPretext(() => ({
    firstName: 'jones',
  })).configPartialState(() => ({
    age: 65,
  }));

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext._configState.firstName);
  isNotAny(pretext._configState.age);
  expectType<{ firstName: string; age: number }>(pretext._configState);
  expectType<string>(pretext._configState.firstName);
  expectType<number>(pretext._configState.age);

  t.is(pretext._configState.firstName, 'jones');
  t.is(pretext._configState.age, 65);
});
