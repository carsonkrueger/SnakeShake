import { useEffect, useRef, useState } from "react";

import BoardTile from "./components/BoardTile";
import Button from "./components/Button";

enum direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

function App() {
  const BOARD_WIDTH = useRef(15);
  const BOARD_CENTER = useRef(
    Math.floor((BOARD_WIDTH.current * BOARD_WIDTH.current) / 2)
  );
  const BOARD_MAX_SIZE = useRef(BOARD_WIDTH.current * BOARD_WIDTH.current);
  const BOARD = useRef([...Array(BOARD_WIDTH.current * BOARD_WIDTH.current)]);

  const SNAKE_SPEED_INIT = useRef(400);
  const snakeSpeed = useRef(SNAKE_SPEED_INIT.current);

  const initDirection = useRef(direction.RIGHT);
  const curDirection = useRef(initDirection.current);

  const [isPaused, setIsPaused] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [appleIdx, setAppleIdx] = useState(BOARD_CENTER.current + 3);
  const [snake, setSnake] = useState([BOARD_CENTER.current - 3]);
  // const [board, setBoard] = useState([
  //   ...Array(BOARD_WIDTH.current * BOARD_WIDTH.current),
  // ]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          if (initDirection.current !== direction.DOWN)
            curDirection.current = direction.UP;
          break;
        case "d":
        case "ArrowRight":
          if (initDirection.current !== direction.LEFT)
            curDirection.current = direction.RIGHT;
          break;
        case "s":
        case "ArrowDown":
          if (initDirection.current !== direction.UP)
            curDirection.current = direction.DOWN;
          break;
        case "a":
        case "ArrowLeft":
          if (initDirection.current !== direction.RIGHT)
            curDirection.current = direction.LEFT;
          break;
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      initDirection.current = curDirection.current;
      if (!isPaused && !isGameOver) move();
      // console.log(snake);
    }, snakeSpeed.current);

    return () => clearInterval(interval);
  }, [snake, isPaused]);

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
    switch (curDirection.current) {
      case direction.UP:
        if (idx < 0) return false;
        return true;
      case direction.RIGHT:
        if (idx % BOARD_WIDTH.current === 0) return false;
        return true;
      case direction.DOWN:
        if (idx > BOARD_MAX_SIZE.current) return false;
        return true;
      case direction.LEFT:
        if (idx % BOARD_WIDTH.current === BOARD_WIDTH.current - 1) return false;
        return true;
    }
  }

  function move(): void {
    let headIdx: number = ensure(snake.at(snake.length - 1));
    let newIdx = 0;

    const newSnake = [...snake];

    // grow snake until 4 long AND grow snake when eating apple
    if (snake.length >= 4 && appleIdx != headIdx) newSnake.shift();
    if (appleIdx == headIdx) eat();

    switch (curDirection.current) {
      case direction.UP:
        newIdx = upIdx(headIdx);
        break;
      case direction.RIGHT:
        newIdx = rightIdx(headIdx);
        break;
      case direction.DOWN:
        newIdx = downIdx(headIdx);
        break;
      case direction.LEFT:
        newIdx = leftIdx(headIdx);
        break;
    }

    if (isInBounds(newIdx) && !isSnakeIdx(newIdx)) {
      newSnake.push(newIdx);
      setSnake(() => newSnake);
    } else {
      gameover();
    }
  }

  function start(): void {
    setIsPaused(false);
  }

  function restart(): void {
    setIsPaused(true);
    setIsGameOver(false);
    setAppleIdx(BOARD_CENTER.current + 3);
    setSnake([BOARD_CENTER.current - 3]);
    snakeSpeed.current = SNAKE_SPEED_INIT.current;
    curDirection.current = direction.RIGHT;
  }

  function eat() {
    let pos: number = -1;
    while (pos === -1 || isSnakeIdx(pos))
      pos = Math.floor(Math.random() * BOARD_MAX_SIZE.current);
    setAppleIdx(pos);

    if (snakeSpeed.current >= 100) snakeSpeed.current -= 8;
  }

  function gameover() {
    // alert("GAME OVER");
    setIsGameOver(true);
  }

  function ensure<T>(argument: T | undefined | null): T {
    if (argument === undefined || argument === null)
      throw new TypeError("Invalid type match");
    return argument;
  }

  return (
    <div className="">
      <div className="flex flex-wrap justify-center items-center w-160 h-160">
        {BOARD.current.map((e, i) => (
          <BoardTile isSnake={isSnakeIdx(i)} isApple={appleIdx === i} key={i} />
        ))}
      </div>
      <Button
        text={`${isPaused ? "PLAY" : "RESTART"}`}
        onClick={isPaused ? start : restart}
      />
    </div>
  );
}

export default App;
