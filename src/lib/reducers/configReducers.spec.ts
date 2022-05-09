import anyTest, { TestInterface } from 'ava';
import { expectType } from 'tsd';

import { expectTypeParam0, expectTypeParam1 } from '../../helpers/expectTypes';
import { isNotAny } from '../../helpers/isNotAny';
import { createPretext } from '../createPretext';

function generatePretextFactory() {
  return createPretext(
    'DKVOX',
    {
      firstName: 'javant',
    },
    () => ({
      changeName(state, newName: string) {
        state.firstName = newName;
        this.secondCallAllCaps(state);
        return newName; // return this here only as a means to test 'isNotAny' and ensure type is maintained
      },
      secondCallAllCaps: (state) => {
        state.firstName = state.firstName.toUpperCase();
      },
    })
  );
}

const test = anyTest as TestInterface<ReturnType<typeof generatePretextFactory>>;

test.beforeEach((t) => {
  t.context = generatePretextFactory();
});

test('append more state via configStatePartial and ensure internal _config types and values are set correctly [AUFC6]', (t) => {
  const pretext = t.context;

  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext._configState.firstName);
  expectType<{ firstName: string }>(pretext._configState);
  expectType<string>(pretext._configState.firstName);

  isNotAny(pretext._configReducers);
  isNotAny(pretext._configReducers.changeName);
  expectType<{ changeName(state: { firstName: string }, newName: string): void }>(pretext._configReducers);
  expectTypeParam0<{ firstName: string }>(pretext._configReducers.changeName);
  expectTypeParam1<string>(pretext._configReducers.changeName);

  t.is(pretext._configState.firstName, 'javant'); // todo this should change once wired up
  t.is(Object.keys(pretext._configReducers).length, 2);
});
