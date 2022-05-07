import test from 'ava';

import { createPretext } from './createPretext';

const pretext = createPretext().setState(
  // docs: cool that you can kind of naturally group chunks of state into multiple calls to `addState`
  () => ({
    firstName: 'john',
  })
);

test('if state has been correctly set', (t) => {
  t.is(pretext.state.firstName, 'john');
});
