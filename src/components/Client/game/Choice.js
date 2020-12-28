import React from "react";
import styled from "styled-components";

const Choice = ({ text }) => {
  if (!text) return null;

  return <QuizText>{text}</QuizText>;
};

export default Choice;

const QuizText = styled.div`
  width: 11vw;
  line-height: 5vh;
  font-size: 18px;
`;
