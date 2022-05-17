import React from 'react';
import { createPretext } from 'pretext-state';

const todosPretext = createPretext(
  'todos',
  () => ({
    firstName: 'jimmy',
    count: 0,
    // // regular function has access to modified and magical 'this' context (this also requires state being wrapped in function)
    // double() {
    //   return this.count * 2;
    // },
    // // arrow function doesn't have 'this' context so much rely on 'state' ref arg (which is also magical)
    // quadruple: ({ state }: { state: { [key: string]: any } }) => {
    //   return state.double * 2;
    // },
  }),
  {
    inc(state, num: number) {
      console.log('inc', state, num);
      state.count += num;
      state.firstName = 'changed name too';
    },
  }
);

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
        <div>firstName: {pretextValues.firstName}</div>
        <div>count: {pretextValues.count}</div>
        {/*<div>double: {(pretextValues as any).double}</div>*/}
        {/*<div>quadruple: {(pretextValues as any).quadruple}</div>*/}
      </div>
      <div>
        <h4>destruct</h4>
        <div>firstName: {firstName}</div>
        <div>count: {count}</div>
        {/*<div>double: {double}</div>*/}
        {/*<div>quadruple: {quadruple}</div>*/}
      </div>
      <div>
        <h3>Inc count</h3>
        <button onClick={() => todosPretext.actions.inc(2)}>Inc</button>
      </div>
    </div>
  );
}
