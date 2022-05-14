import anyTest, { TestInterface } from 'ava';
import { expectType } from 'tsd';

import { expectTypeParam0, expectTypeParam1 } from '../../helpers/expectTypes';
import { isNotAny } from '../../helpers/isNotAny';
import { createPretext } from '../createPretext';

function generatePretextFactory() {
  return createPretext(
    'ADKSZ',
    {
      firstName: 'javian',
    },
    {
      changeName: (state, newName: string) => {
        state.firstName = newName;
        return newName; // return this here only as a means to test 'isNotAny' and ensure type is maintained
      },
    }
  );
}

const test = anyTest as TestInterface<ReturnType<typeof generatePretextFactory>>;

test.beforeEach((t) => {
  t.context = generatePretextFactory();
});

test('append more reducers via configReducersPartial and ensure internal _config types and values are set correctly [3O9GY]', (t) => {
  const pretext = t.context
    .configReducersPartial({
      doubleName: (state) => {
        const { firstName } = state;
        state.firstName = `${firstName}-${firstName}`;
        return state.firstName; // return this here only as a means to test 'isNotAny' and ensure type is maintained
      },
    })
    .configReducersPartial({
      clear: (state) => {
        state.firstName = ``;
      },
    });

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext._configState.firstName);
  expectType<{ firstName: string }>(pretext._configState);
  expectType<string>(pretext._configState.firstName);

  isNotAny(pretext._configReducers);
  isNotAny(pretext._configReducers.changeName);
  expectType<{
    changeName(state: { firstName: string }, newName: string): void;
    doubleName(state: { firstName: string }): void;
  }>(pretext._configReducers);
  expectTypeParam0<{ firstName: string }>(pretext._configReducers.changeName);
  expectTypeParam1<string>(pretext._configReducers.changeName);
  expectTypeParam0<{ firstName: string }>(pretext._configReducers.doubleName);
  expectTypeParam1<undefined>(pretext._configReducers.doubleName);
  isNotAny(pretext._configReducers.doubleName({ firstName: '' }));

  t.is(pretext._configState.firstName, 'javian'); // todo this should change once wired up
  t.is(Object.keys(pretext._configReducers).length, 3);
});
