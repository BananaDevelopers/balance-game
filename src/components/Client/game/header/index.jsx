import React from "react";
import styled from "styled-components";

function GameHeader({
  num,
  quizesLength,
  quizTitle,
  resultFlag,
  progress,
}) {
  return (
    <>
      <QuizNumber>
        문제 {num + 1} / {quizesLength}
      </QuizNumber>
      <QuizTitle>{quizTitle}</QuizTitle>
    </>
  );
}

export default GameHeader;

const QuizNumber = styled.span`
  margin: 0px 20px;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  background-color: #ff6a72;
  color: #f2f2f2;
`;

const QuizTitle = styled.div`
  margin: 20px 20px;
  padding: 24px 32px;
  border-radius: 6px;
  font-size: 18px;
  background-color: #3e6991;
  color: #f2f2f2;
`;