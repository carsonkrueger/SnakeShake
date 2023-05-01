import { useEffect, useRef, useState } from "react";

import BoardTile from "./components/BoardTile";
import Button from "./components/Button";

import trophy from "./assets/trophy.png";

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

  const SNAKE_SPEED_INIT = useRef(225);
  const SNAKE_SPEED_INCREASE = useRef(5);
  const SNAKE_SPEED_MAX = useRef(100);
  const snakeSpeed = useRef(SNAKE_SPEED_INIT.current);

  const curDirection = useRef(direction.RIGHT);
  const directionQueue = useRef([direction.RIGHT]);

  const score = useRef(0);
  const [highscore, setHighscore] = useState(0);

  const [isPaused, setIsPaused] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [appleIdx, setAppleIdx] = useState(BOARD_CENTER.current + 3);
  const [snake, setSnake] = useState([BOARD_CENTER.current - 3]);

  useEffect(() => {
    if (localStorage.getItem("highscore") !== null)
      setHighscore(parseInt(ensure(localStorage.getItem("highscore"))));
    function handleKeyDown(e: KeyboardEvent) {
      if (directionQueue.current.length <= 4)
        switch (e.key) {
          case "w":
          case "ArrowUp":
            directionQueue.current.push(direction.UP);
            setIsPaused(false);
            break;
          case "d":
          case "ArrowRight":
            directionQueue.current.push(direction.RIGHT);
            setIsPaused(false);
            break;
          case "s":
          case "ArrowDown":
            directionQueue.current.push(direction.DOWN);
            setIsPaused(false);
            break;
          case "a":
          case "ArrowLeft":
            directionQueue.current.push(direction.LEFT);
            setIsPaused(false);
            break;
        }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isGameOver) move();
    }, snakeSpeed.current);

    return () => clearInterval(interval);
  }, [snake, isPaused, appleIdx, isGameOver]);

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

  function oppositeDirection(dir: direction): direction {
    switch (dir) {
      case direction.UP:
        return direction.DOWN;
      case direction.RIGHT:
        return direction.LEFT;
      case direction.DOWN:
        return direction.UP;
      case direction.LEFT:
        return direction.RIGHT;
    }
  }

  function move(): void {
    let headIdx: number = ensure(snake.at(snake.length - 1));
    let newIdx = 0;

    const newSnake = [...snake];

    // grow snake until 4 long AND grow snake when eating apple
    if (snake.length >= 4 && appleIdx != headIdx) newSnake.shift();
    if (appleIdx == headIdx) eat();

    if (directionQueue.current.length > 0) {
      let nextDirection = ensure(directionQueue.current.shift());
      if (nextDirection !== oppositeDirection(curDirection.current))
        curDirection.current = nextDirection;
    }

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

  function reset(): void {
    setIsPaused(true);
    setIsGameOver(false);
    setAppleIdx(BOARD_CENTER.current + 3);
    setSnake([BOARD_CENTER.current - 3]);
    snakeSpeed.current = SNAKE_SPEED_INIT.current;
    curDirection.current = direction.RIGHT;
    directionQueue.current = [direction.RIGHT];
    score.current = 0;
  }

  function eat() {
    score.current += 1;
    let pos: number = -1;
    while (pos === -1 || isSnakeIdx(pos))
      pos = Math.floor(Math.random() * BOARD_MAX_SIZE.current);
    setAppleIdx(pos);

    if (snakeSpeed.current >= SNAKE_SPEED_MAX.current)
      snakeSpeed.current -= SNAKE_SPEED_INCREASE.current;
  }

  function gameover() {
    setIsGameOver(true);
    if (score.current > highscore) {
      setHighscore(score.current);
      localStorage.setItem("highscore", score.current.toString());
    }
  }

  function ensure<T>(argument: T | undefined | null): T {
    if (argument === undefined || argument === null)
      throw new TypeError("Invalid type match");
    return argument;
  }

  return (
    <div className="rounded-lg bg-green-600 flex flex-col justify-between p-5">
      <div className="flex flex-row items-center justify-between text-white text-2xl font-poppins [&>*]:min-w-16">
        <div></div>
        Score: {score.current}
        <div className="flex flex-row items-center text-2xl">
          <img src={trophy} className="h-7 w-7" />
          {highscore}
        </div>
      </div>
      <div className="relative flex flex-wrap justify-center items-center w-80 h-80 sm:w-120 sm:h-120 lg:w-160 lg:h-160 md:w-136 md:h-136">
        {BOARD.current.map((_, i) => (
          <BoardTile
            idx={i}
            isSnake={isSnakeIdx(i)}
            isApple={appleIdx === i}
            key={i}
          />
        ))}
      </div>

      <div className="flex flex-row justify-center px-5 [&>*]:mx-5">
        <Button
          text={`${isPaused ? "PLAY" : "RESET"}`}
          className="hover:animate- font-poppins bg-blue-600 text-white text-center rounded-lg px-3 mt-5 py-1 text-lg"
          onClick={isPaused ? start : reset}
        />
        {/* <Button
          text={"INVITE"}
          className="bg-blue-600 text-white text-center rounded-lg px-3 mt-5 py-1 text-lg"
        /> */}
      </div>
    </div>
  );
}

export default App;
