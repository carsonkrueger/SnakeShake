type privateProps = {
  isSnake: boolean;
  isApple: boolean;
};

export default function BoardTile({ isSnake, isApple }: privateProps) {
  return (
    <div
      className={`border-black rounded-md ${
        isSnake ? "bg-blue-500" : isApple ? "bg-red-500" : "bg-green-500"
      } col h-9 w-9 m-0.8`}
    ></div>
  );
}
