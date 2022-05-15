import React from 'react';
import { createPretext } from 'pretext-state';

const todosPretext = createPretext('todos', {
  firstName: 'jimmy',
  count: 0,
});

setInterval(() => {
  // todosPretext._stateAtoms.count.atomRef.value++;
  todosPretext._stateAtoms.count.setValue((v) => v + 1);
}, 1000);

export function Todos() {
  const pretextValues = todosPretext.usePretextFallout();
  const { count, firstName } = todosPretext.usePretextFallout();

  return (
    <div>
      <h1>Todos</h1>
      <div>
        <h4>stuct</h4>
        {pretextValues.firstName} &count: {pretextValues.count}
      </div>
      <div>
        <h4>destruct</h4>
        {firstName} &count: {count}
      </div>
    </div>
  );
}
