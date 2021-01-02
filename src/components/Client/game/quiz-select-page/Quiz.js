import React from "react";
import styled from "styled-components";

export const LEFT = -1;
export const RIGHT = 1;

function Quiz({ direction = LEFT, text = null, onClick }) {
  return (
    <QuizContainer direction={direction} onClick={() => onClick(direction)}>
      <QuizText>{text}</QuizText>
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
    props.direction === LEFT
      ? "margin-top: 20px; border-radius: 0px 12px 12px 0px; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);"
      : " margin-left: 6vw; border-radius: 12px 0px 0px 12px; box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);"}
`;

const QuizText = styled.div`
  width: 11vw;
  line-height: 5vh;
  font-size: 18px;
`;
