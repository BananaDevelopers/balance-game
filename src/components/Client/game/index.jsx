import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { dbService } from "fbase";

import GameHeader from "./header";
import QuizSelectPage from "./quiz-select-page";
import QuizResultPage from "./quiz-result-page";

function Gaming() {
  const history = useHistory();

  const [quizs, setQuizs] = useState([]);
  const [num, setNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selection, setSelection] = useState(false);
  const [point, setPoint] = useState(0);
  const [resultFlag, setResultFlag] = useState(false);

  useEffect(() => {
    dbService.collection("quiz").onSnapshot(({ docs }) => {
      setQuizs(
        docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setIsLoading(true);
    });
  }, []);

  const handleSelectQuiz = (selection, earnedPoint) => {
    setResultFlag(true);
    if (!selection) return;

    setSelection(selection);
    setPoint(point + earnedPoint);
  };

  const handleClickNext = () => {
    setNum(num + 1);
    setResultFlag(false);

    const isFinalQuiz = num === quizs.length - 1;
    if (isFinalQuiz) {
      history.push("/game/result");
      return;
    }
  };

  return (
    <GamingContainer>
      {isLoading ? (
        <>
          <GameHeader
            num={num + 1}
            quizesLength={quizs.length}
            quizTitle={quizs[num].title}
          />
          {!resultFlag ? (
            <QuizSelectPage quiz={quizs[num]} onSelectQuiz={handleSelectQuiz} />
          ) : (
            <QuizResultPage
              selection={selection}
              quiz={quizs[num]}
              point={point}
              onClickNext={handleClickNext}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </GamingContainer>
  );
}

export default Gaming;

const GamingContainer = styled.div`
  padding: 50px 0px;
  background-color: #6eb2f3;
`;
