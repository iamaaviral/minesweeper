import './App.css';
import  Board from './components/board/index' 

function App() {

  return (
    <div className="App">
      <div className="app-main">
        <Board height={4} width={4} minesCount={1}/>
      </div>

    </div>
  );
}

export default App;
