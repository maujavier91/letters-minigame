import { useState, useEffect } from "react";
import "./Board.css";
import Tile from "./Tile";

type Props = {
  testBoard: string[];
  dictionary: string[];
  size: number;
};

const Board = ({ testBoard, dictionary, size }: Props) => {
  const [foundOnDict, setFoundOnDict] = useState(false);
  const [isCorrectOrder, setIsCorrectOrder] = useState(false);

  const [randomBoard, setRandomBoard] = useState(
    Array.from(new Array(size), y =>
      Array.from(new Array(size), x => {
        return {
          letter: testBoard[Math.floor(testBoard.length * Math.random())],
          isSelected: false
        };
      })
    )
  );
  useEffect(() => {
    document.documentElement.style.setProperty('--board-size', `${size}`)
    setRandomBoard(
      Array.from(new Array(size), y =>
        Array.from(new Array(size), x => {
          return {
            letter: testBoard[Math.floor(testBoard.length * Math.random())],
            isSelected: false
          };
        })
      )
    );
    reset();
  }, [size, testBoard]);
  const [selection, setSelection] = useState("");
  useEffect(() => {
    if (dictionary.some(word => word.startsWith(selection.toLowerCase()))) {
      setIsCorrectOrder(true);
    } else {
      setIsCorrectOrder(false);
    }
    if (dictionary.includes(selection.toLocaleLowerCase())) {
      setFoundOnDict(true);
    } else {
      setFoundOnDict(false);
    }
  }, [selection, dictionary]);
  const addSelectedLetter = (
    selectedLetter: string,
    row: number,
    col: number
  ) => {
    if (checkAdjacent(row, col) || selection.length === 0) {
      setRandomBoard(prevBoardState => {
        prevBoardState[col][row] = { letter: selectedLetter, isSelected: true };
        return prevBoardState;
      });
      let newWord = selection + selectedLetter;
      setSelection(newWord);
    }
  };
  const resetSelection = () => {
    setSelection("");
  };
  const resetTiles = () => {
    setIsCorrectOrder(false);
    setRandomBoard(prevBoardState => {
      return prevBoardState.map(arr =>
        arr.map(arr2 => {
          arr2.isSelected = false;
          return arr2;
        })
      );
    });
  };
  const reset = () => {
    resetTiles();
    resetSelection();
  };

  const checkAdjacent = (row: number, col: number) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (randomBoard[col + i]?.[row + j]?.isSelected) {
          return true;
        }
      }
    }
    return false;
  };
  return (
    <>
      <div className="button" onClick={reset}>
        clear word
        <div className="circle">
          <div className="diagonal-bar left"></div>
          <div className="diagonal-bar right"></div>
        </div>
      </div>
      <div className="board">
        {randomBoard.map((col, j) => {
          return col.map(({ letter, isSelected }, i) => {
            return (
              <Tile
                key={"row-" + i + "-col-" + j}
                letter={letter}
                onSelection={() => {
                  addSelectedLetter(letter, i, j);
                }}
                isSelected={isSelected}
                isCorrectOrder={isCorrectOrder}
              />
            );
          });
        })}
      </div>
      <div className={"box"}>
        <span
          className={`${isCorrectOrder ? "valid" : "invalid"} selection-word`}
        >
          {selection}
        </span>
        <span
          className={`${foundOnDict ? "valid" : "invalid"} validator ${
            selection.length === 0 || (isCorrectOrder && !foundOnDict)
              ? "hidden"
              : ""
          }`}
        >
          {foundOnDict ? "Valid!" : "Invalid"}
        </span>
      </div>
    </>
  );
};

export default Board;
