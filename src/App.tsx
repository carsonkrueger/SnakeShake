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
};

function App() {
  const BOARD_SIZE = useRef(15);
  const BOARD_CENTER = useRef(
    Math.floor((BOARD_SIZE.current * BOARD_SIZE.current) / 2)
  );
  const SNAKE_SPEED = useRef(500);
  const CUR_DIRECTION = useRef(direction.RIGHT);

  const [snake, setSnake] = useState(new Array<number>());
  const [board, setBoard] = useState([
    ...Array(BOARD_SIZE.current * BOARD_SIZE.current),
  ]);

  useEffect(() => {
    setSnake([BOARD_CENTER.current]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log([...snake]);
    }, SNAKE_SPEED.current);

    return () => clearInterval(interval);
  }, []);

  const isSnakeIdx = (idx: number) => {
    return snake.includes(idx);
  };

  const upIdx = (idx: number) => {
    // if (idx < 0)
    //   return (BOARD_SIZE.current * BOARD_SIZE.current + idx)
    return idx - BOARD_CENTER.current;
  };

  const rightIdx = (idx: number) => {
    return idx + 1;
  };

  const downIdx = (idx: number) => {
    return idx - BOARD_CENTER.current;
  };

  const leftIdx = (idx: number) => {
    return idx - 1;
  };

  const move = () => {
    let newSnake = [...snake];
    newSnake.shift();
    let headPos: number = snake.at(snake.length - 1);
    switch (CUR_DIRECTION.current) {
      case direction.UP:
        let newIdx = upIdx(headPos);
        newSnake.push(newIdx);
        break;
      case direction.RIGHT:
        newIdx = rightIdx(headPos);
        newSnake.push(newIdx);
        break;
      case direction.DOWN:
        newIdx = downIdx(headPos);
        newSnake.push(newIdx);
        break;
      case direction.LEFT:
        newIdx = leftIdx(headPos);
        newSnake.push(newIdx);
        break;
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center w-160 h-160">
      {board.map((e, i) => (
        <BoardTile isSnake={isSnakeIdx(i)} key={i} />
      ))}
    </div>
  );
}

export default App;
