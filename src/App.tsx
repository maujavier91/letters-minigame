import "./App.css";
import Board from "./components/Board";
import dictionary from "./files/dictionary.json";
import testBoard from "./files/test-board-2.json";

function App() {
  return (
    <div className="App">
      <Board
        size={4}
        testBoard={testBoard.board}
        dictionary={dictionary.words}
      ></Board>
    </div>
  );
}

export default App;
