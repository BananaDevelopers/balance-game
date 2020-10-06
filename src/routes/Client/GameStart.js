import React from "react";
import { useHistory } from "react-router-dom";

function GameStart() {
  const history = useHistory();
  const onClickStart = () => {
    history.push("/game");
  };
  return (
    <div>
      GameStart
      <button onClick={onClickStart}>시작하기</button>
    </div>
  );
}

export default GameStart;
