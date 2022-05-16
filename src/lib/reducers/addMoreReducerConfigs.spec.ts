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

test(`append more reducers via 'addMoreReducerConfigs' and ensure internal config types and values are set correctly [3O9GY]`, (t) => {
  const pretext = t.context
    .addMoreReducerConfigs({
      doubleName: (state) => {
        const { firstName } = state;
        state.firstName = `${firstName}-${firstName}`;
        return state.firstName; // return this here only as a means to test 'isNotAny' and ensure type is maintained
      },
    })
    .addMoreStateConfigs({
      lastName: 'smith',
    })
    .addMoreStateConfigs(() => ({
      age: 0,
    }))
    .addMoreReducerConfigs({
      clear: (state) => {
        state.lastName = '';
        state.firstName = '';
      },
    });

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext._stateConfig.firstName);
  expectType<{ firstName: string }>(pretext._stateConfig);
  expectType<string>(pretext._stateConfig.firstName);

  // pretext._reducersConfig.changeName({} as any, 'hello');
  // pretext._reducersConfig.clear({} as any, 'hello');

  type NewExpectedStateT = { firstName: string; lastName: string; age: number };

  isNotAny(pretext._reducersConfig);
  isNotAny(pretext._reducersConfig.changeName);
  expectType<{
    changeName(state: NewExpectedStateT, newName: string): void;
    doubleName(state: NewExpectedStateT): void;
    clear(state: { firstName: string; lastName: string; age: number }): void;
  }>(pretext._reducersConfig);
  expectTypeParam0<NewExpectedStateT>(pretext._reducersConfig.changeName);
  expectTypeParam1<string>(pretext._reducersConfig.changeName);
  expectTypeParam0<NewExpectedStateT>(pretext._reducersConfig.doubleName);
  // expectTypeParam1<undefined>(pretext._reducersConfig.doubleName);
  isNotAny(pretext._reducersConfig.doubleName({ firstName: '', lastName: '', age: 0 }));
  expectTypeParam0<NewExpectedStateT>(pretext._reducersConfig.clear);
  // expectTypeParam1<undefined>(pretext._reducersConfig.clear);
  isNotAny(pretext._reducersConfig.clear({ firstName: '', lastName: '', age: 0 }));

  t.is(pretext._stateConfig.firstName, 'javian'); // todo this should change once wired up
  t.is(Object.keys(pretext._reducersConfig).length, 3);
});
