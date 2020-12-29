import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { dbService } from "fbase";

import Quiz, {
  LEFT,
  RIGHT,
} from "components/client/game/quiz-select-page/Quiz";
import { SET_POINT, SET_SELECTION, SET_RESULT_FLAG } from "../Gaming";

const PROGRESSBAR_SEC = 10; // 제한시간

function QuizSelectPage({ quiz = null, dispatch }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(100);
    const timeout = setTimeout(() => {
      goToQuizResultPage();
    }, PROGRESSBAR_SEC * 1000);

    return () => clearTimeout(timeout);
  }, []);

  const onClick = async (selection) => {
    dispatch({ type: SET_SELECTION, selection: selection });

    dispatch({
      type: SET_POINT,
      quizLCount: quiz.QuizLCount,
      quizRCount: quiz.QuizRCount,
    });

    // todo: set_selection dispatch 안에 넣기
    if (selection === LEFT) {
      await dbService.doc(`quiz/${quiz.docid}`).update({
        QuizLCount: quiz.QuizLCount + 1,
      });
    } else if (selection === RIGHT) {
      await dbService.doc(`quiz/${quiz.docid}`).update({
        QuizRCount: quiz.QuizRCount + 1,
      });
    }

    goToQuizResultPage();
  };

  const goToQuizResultPage = () => {
    dispatch({ type: SET_RESULT_FLAG, resultFlag: true });
  };

  return (
    <>
      <ProgressContainer>
        <GameProgressBar style={{ width: `${width}%` }} sec={PROGRESSBAR_SEC} />
      </ProgressContainer>

      <Quiz
        direction={LEFT}
        text={quiz ? quiz.QuizL : null}
        onClick={onClick}
      />
      <VersusText>vs</VersusText>
      <Quiz
        direction={RIGHT}
        text={quiz ? quiz.QuizR : null}
        onClick={onClick}
      />
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
