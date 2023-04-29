import { useEffect, useRef, useState } from "react";

import BoardTile from "./components/BoardTile";

enum direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

type snakeTile = {
  idx: number;
  isSnake: boolean;
  moving?: direction;
};

function App() {
  const BOARD_SIZE = useRef(15);
  const BOARD_CENTER = useRef(
    Math.floor((BOARD_SIZE.current * BOARD_SIZE.current) / 2)
  );
  const [snake, setSnake] = useState(new Array<snakeTile>());

  useEffect(() => {
    let newSnake: Array<snakeTile> = new Array<snakeTile>();

    for (let i: number = 0; i < BOARD_SIZE.current * BOARD_SIZE.current; i++) {
      let tile: snakeTile = {
        idx: i,
        isSnake: false,
      };
      if (i == BOARD_CENTER.current) tile.isSnake = true;
      console.log(BOARD_CENTER.current);
      newSnake.push(tile);
    }
    setSnake(newSnake);
  }, []);

  const isSnakeIdx = (idx: number) => {
    return snake.at(idx)?.isSnake;
  };

  return (
    <div className="flex flex-wrap justify-center items-center  w-160 h-160">
      {snake.map((e) => (
        <BoardTile snake={e} />
      ))}
    </div>
  );
}

export default App;
