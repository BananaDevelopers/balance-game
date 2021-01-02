import React from "react";
import styled from "styled-components";

const QuizResult = ({ quizText, count, totalCount, isSelected = false }) => {
  return (
    <QuizWrapper isSelected={isSelected}>
      <div>
        {quizText} {Math.round((count / totalCount) * 100)}%{count}명
      </div>
    </QuizWrapper>
  );
};

export default QuizResult;

const QuizWrapper = styled.div`
  background-color: ${(props) => (props.isSelected ? "black" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
`;
