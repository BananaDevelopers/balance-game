import React from "react";
import styled, { css } from "styled-components";

import Choice from "components/client/game/Choice";
import QuizResult from "components/client/game/QuizResult";

function Quiz({
  direction = "left",
  text = null,
  quiz = null,
  resultFlag,
  choiceClick,
}) {
  const flag = direction === "left" ? 0 : 1;

  return (
    <QuizContainer direction={direction} onClick={() => choiceClick(flag)}>
      {!resultFlag ? (
        <Choice text={text} />
      ) : (
        <QuizResult obj={quiz} flag={flag} />
      )}
    </QuizContainer>
  );
}

export default Quiz;

const QuizContainer = styled.div`
  width: 80%;
  height: 28vh;
  background-color: #f6fafe;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;

  ${(props) =>
    props.direction === "left"
      ? "margin-top: 20px; border-radius: 0px 12px 12px 0px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);"
      : " margin-left: 6vw; border-radius: 12px 0px 0px 12px; box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);"}
`;
