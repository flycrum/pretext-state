import anyTest, { TestInterface } from 'ava';

import { createPretext } from '../createPretext';

function generatePretextFactory() {
  return createPretext('F8P5E', {
    firstName: 'jimmy',
  });
}

const test = anyTest as TestInterface<ReturnType<typeof generatePretextFactory>>;

test.beforeEach((t) => {
  t.context = createPretext('F8P5E').setStateConfig(() => ({
    firstName: 'jimmy',
  }));
});

// test(`append more state via addMoreStateConfigs and ensure internal config types and values are set correctly [EN5CW]`, (t) => {
//   const pretext = t.context.addMoreStateConfigs({
//     age: 99,
//   });
//
//   // typings (while these can't truly be tested, running test suite will fail if typings break)
//   isNotAny(pretext._configState.firstName);
//   isNotAny(pretext._configState.age);
//   expectType<{ firstName: string; age: number }>(pretext._configState);
//   expectType<string>(pretext._configState.firstName);
//   expectType<number>(pretext._configState.age);
//
//   t.is(pretext._configState.firstName, 'jimmy');
//   t.is(pretext._configState.age, 99);
// });
