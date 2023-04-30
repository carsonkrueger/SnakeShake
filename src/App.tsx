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
  const BOARD_WIDTH = useRef(15);
  const BOARD_CENTER = useRef(
    Math.floor((BOARD_WIDTH.current * BOARD_WIDTH.current) / 2)
  );
  const MAX_BOARD_SIZE = useRef(BOARD_WIDTH.current * BOARD_WIDTH.current);
  const SNAKE_SPEED = useRef(500);
  const CUR_DIRECTION = useRef(direction.RIGHT);
  const [snake, setSnake] = useState([BOARD_CENTER.current]);
  const [board, setBoard] = useState([
    ...Array(BOARD_WIDTH.current * BOARD_WIDTH.current),
  ]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          CUR_DIRECTION.current = direction.UP;
          break;
        case "d":
        case "ArrowRight":
          CUR_DIRECTION.current = direction.RIGHT;
          break;
        case "s":
        case "ArrowDown":
          CUR_DIRECTION.current = direction.DOWN;
          break;
        case "a":
        case "ArrowLeft":
          CUR_DIRECTION.current = direction.LEFT;
          break;
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      move();
      console.log(snake);
    }, SNAKE_SPEED.current);

    return () => clearInterval(interval);
  }, [snake]);

  function isSnakeIdx(idx: number): boolean {
    return snake.includes(idx);
  }

  function upIdx(idx: number): number {
    return idx - BOARD_WIDTH.current;
  }

  function rightIdx(idx: number): number {
    return idx + 1;
  }

  function downIdx(idx: number): number {
    return idx + BOARD_WIDTH.current;
  }

  function leftIdx(idx: number): number {
    return idx - 1;
  }

  function isInBounds(idx: number): boolean {
    switch (CUR_DIRECTION.current) {
      case direction.UP:
        if (idx < 0) return false;
        return true;
      case direction.RIGHT:
        if (idx % BOARD_WIDTH.current === 0) return false;
        return true;
      case direction.DOWN:
        if (idx > MAX_BOARD_SIZE.current) return false;
        return true;
      case direction.LEFT:
        if (idx % BOARD_WIDTH.current === BOARD_WIDTH.current - 1) return false;
        return true;
    }
  }

  function move(): void {
    let headPos: number = ensure(snake.at(snake.length - 1));
    let newIdx = 0;

    const newSnake = [...snake];
    newSnake.shift();

    switch (CUR_DIRECTION.current) {
      case direction.UP:
        newIdx = upIdx(headPos);
        break;
      case direction.RIGHT:
        newIdx = rightIdx(headPos);
        break;
      case direction.DOWN:
        newIdx = downIdx(headPos);
        break;
      case direction.LEFT:
        newIdx = leftIdx(headPos);
        break;
    }
    if (isInBounds(newIdx)) {
      newSnake.push(newIdx);
      setSnake(() => newSnake);
    }
  }

  function ensure<T>(argument: T | undefined | null): T {
    if (argument === undefined || argument === null)
      throw new TypeError("Invalid type match");
    return argument;
  }

  return (
    <div className="flex flex-wrap justify-center items-center w-160 h-160">
      {board.map((e, i) => (
        <BoardTile isSnake={isSnakeIdx(i)} key={i} />
      ))}
    </div>
  );
}

export default App;
