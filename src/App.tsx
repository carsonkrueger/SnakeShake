import { useRef } from "react";

import BoardTile from "./components/BoardTile";

function App() {
  const BOARD_SIZE = useRef(10);

  return (
    <div className="flex flex-wrap justify-center items-center  w-128 h-128">
      {[...Array(BOARD_SIZE.current * BOARD_SIZE.current)].map((e, i) => (
        <BoardTile i={i} />
      ))}
    </div>
  );
}

export default App;
