import React from 'react';
import { createPretext } from 'pretext-state';

const todosPretext = createPretext('todos', {
  firstName: 'jimmy',
});

export function Todos() {
  return (
    <div>
      <h1>Todos</h1>
      <div>{todosPretext._configState.firstName}</div>
    </div>
  );
}
