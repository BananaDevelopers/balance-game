import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const GameStartContainer = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  font-size: 36px;
`;

const GameStartBtn = styled.button`
  margin-top: 50px;
  width: 20%;
`;

function GameStart() {
  const history = useHistory();
  const onClickStart = () => {
    history.push("/game");
  };
  return (
    <GameStartContainer>
      GameStart
      <GameStartBtn onClick={onClickStart}>시작하기</GameStartBtn>
    </GameStartContainer>
  );
}

export default GameStart;
