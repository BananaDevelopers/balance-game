import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { dbService } from "fbase";

import Quiz, {
  LEFT,
  RIGHT,
} from "components/client/game/quiz-select-page/Quiz";

const PROGRESSBAR_SEC = 10; // 제한시간

function QuizSelectPage({ quiz, onSelectQuiz }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(100);
    const timeout = setTimeout(() => {
      onSelectQuiz(null, null);
    }, PROGRESSBAR_SEC * 1000);

    return () => clearTimeout(timeout);
  }, []);

  const onClick = async (selection) => {
    dbService.doc(`quiz/${quiz.id}`).update(
      selection === LEFT
        ? {
            QuizLCount: quiz.QuizLCount + 1,
          }
        : {
            QuizRCount: quiz.QuizRCount + 1,
          }
    );
    onSelectQuiz(selection, earnedPoint(selection));
  };

  const earnedPoint = (selection) => {
    const quizLCount = quiz.QuizLCount;
    const quizRCount = quiz.QuizRCount;

    if (
      (quizLCount > quizRCount && selection === LEFT) ||
      (quizLCount < quizRCount && selection === RIGHT)
    ) {
      //다수선택지
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <>
      <ProgressContainer>
        <GameProgressBar style={{ width: `${width}%` }} sec={PROGRESSBAR_SEC} />
      </ProgressContainer>

      <Quiz direction={LEFT} text={quiz.QuizL} onClick={onClick} />
      <VersusText>vs</VersusText>
      <Quiz direction={RIGHT} text={quiz.QuizR} onClick={onClick} />
    </>
  );
}

export default QuizSelectPage;

const ProgressContainer = styled.div`
  background-color: #f6fafe;

  margin: 0px 20px;
  border-radius: 10px;
`;

const GameProgressBar = styled.div`
  background-color: #ffdd59;
  color: #fad390;

  width: 0;
  height: 20px;
  border-radius: 10px;

  transition: width ${(props) => props.sec}s;
`;

const VersusText = styled.div`
  font-size: 60px;
  color: #ff5e57;
  text-align: center;
  margin-bottom: 16px;
`;
