import React from 'react';
import './App.css';
import { Todos } from './todos/Todos';
import RecoilNexus from 'recoil-nexus';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <RecoilNexus />
        <Todos />
      </RecoilRoot>
    </div>
  );
}

export default App;
