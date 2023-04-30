type privateProps = {
  idx: number;
  isSnake: boolean;
  isApple: boolean;
};

export default function BoardTile({ idx, isSnake, isApple }: privateProps) {
  return (
    <div
      className={`border-black rounded-md ${
        isSnake
          ? "bg-blue-500"
          : isApple
          ? "bg-red-500"
          : idx % 2 == 1
          ? "bg-green-500"
          : "bg-green-450"
      } col h-6 w-6 m-0.6 sm:h-7 md:h-8 md:w-8 md:m-0.7 sm:w-7 lg:h-9 lg:w-9 lg:m-0.8 `}
    ></div>
  );
}
