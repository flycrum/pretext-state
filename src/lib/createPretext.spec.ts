import test from 'ava';
import { expectType } from 'tsd';

import { isNotAny } from '../helpers/isNotAny';

import { createPretext } from './createPretext';

const pretext = createPretext().setState(() => ({
  firstName: 'john' as string,
}));

test('if state has been correctly typed and set', (t) => {
  // typings (while these can't truly be tested, running test suite will fail if typings break)
  isNotAny(pretext);
  isNotAny(pretext.state);
  isNotAny(pretext.state.firstName);
  expectType<{ firstName: string }>(pretext.state);
  expectType<string>(pretext.state.firstName);

  t.is(pretext.state.firstName, 'john');
});
