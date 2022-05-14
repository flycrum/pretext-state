import React from 'react';
import { createPretext } from 'pretext-state';

const todosPretext = createPretext('todos', {
  firstName: 'jimmy',
});

export function Todos() {
  console.log('_stateAtoms.firstName', todosPretext._stateAtoms.firstName);
  console.log('fuck', todosPretext.fuck);
  const names = todosPretext.helpers.usePretextValue(todosPretext.fuck);

  return (
    <div>
      <h1>Todos</h1>
      <div>{todosPretext._configState.firstName}</div>
    </div>
  );
}
