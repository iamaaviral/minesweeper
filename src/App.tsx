import React from 'react';
import './App.css';
import  Board from './components/board/index' 

function App() {

  return (
    <div className="App">
      <div className="app-main">
        <Board height={8} width={8} mines={8}/>
      </div>

    </div>
  );
}

export default App;
