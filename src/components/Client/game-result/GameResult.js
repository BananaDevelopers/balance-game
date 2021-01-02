import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { dbService } from "fbase";

function GameResult() {
  const history = useHistory();

  useEffect(() => {
    return () => {};
  }, []);

  const onClick = () => {
    history.push("/");
  };

  return (
    <div>
      <p>결과보여주기</p>
      <p>....</p>
      <p>결과공유</p>
      <button onClick={onClick}>처음으로가기</button>
    </div>
  );
}

export default GameResult;
