import React from 'react';
import './App.css';
import  Board from './components/board/index' 

function App() {

  return (
    <div className="App">
      <div className="app-main">
        <Board height={3} width={3} mines={2}/>
      </div>

    </div>
  );
}

export default App;
