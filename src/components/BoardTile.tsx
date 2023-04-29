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

type privateProps = {
  snake: snakeTile;
};

export default function BoardTile({ snake }: privateProps) {
  return (
    <div
      className={`border-black rounded-md ${
        snake.isSnake ? "bg-red-500" : "bg-green-500"
      } col h-9 w-9 m-0.8`}
    ></div>
  );
}
