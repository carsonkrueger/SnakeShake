type privateProps = {
  i: number;
};

export default function BoardTile({ i }: privateProps) {
  return (
    <div className=" border-black rounded-md bg-green-500 col h-12 w-12 m-1"></div>
  );
}
