import React from "react";
import styled from "styled-components";

const QuizText = styled.div`
  width: 11vw;
  line-height: 5vh;
  font-size: 18px;
`;

const Choice = ({ text }) => {
  return <QuizText>{text}</QuizText>;
};

export default Choice;
