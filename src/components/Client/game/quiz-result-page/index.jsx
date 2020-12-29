import React from "react";
import styled from "styled-components";

import WriteComment from "components/client/game/WriteComment";
import QuizResult from "./QuizResult";
import { LEFT, RIGHT } from "../quiz-select-page/Quiz";

function QuizResultPage({
  dispatch,
  quiz,
  selection,
  nextClick,
  commentsLength,
  updateComments,
  point,
}) {
  // TODO 결과보여주기 -> dispatch로 하기

  // // 넘어가기
  // if (num <= quizs.length - 1) {
  //   quizs[num].comments.map((c) =>
  //     dispatch({ type: ADD_COMMENT, cmtObj: c })
  //   );
  //   setResultFlag(true);
  // }

  return (
    <>
      <QuizWrapper>
        <QuizResult
          quizText={quiz ? quiz.QuizL : ""}
          count={quiz ? quiz.QuizLCount : 0}
          totalCount={
            quiz ? parseInt(quiz.QuizLCount) + parseInt(quiz.QuizRCount) : 0
          }
          isSelected={selection === LEFT}
        />
        <QuizResult
          quizText={quiz ? quiz.QuizR : ""}
          count={quiz ? quiz.QuizRCount : 0}
          totalCount={
            quiz ? parseInt(quiz.QuizLCount) + parseInt(quiz.QuizRCount) : 0
          }
          isSelected={selection === RIGHT}
        />
      </QuizWrapper>
      <CommentWrapper>
        <div>
          <p>***temp comments***</p>
          <WriteComment
            dispatch={dispatch}
            quizObj={quiz}
            propleft={selection}
          />
        </div>
        <br />
        {commentsLength && updateComments()}
      </CommentWrapper>
      <div>
        <button onClick={nextClick}>next</button>
      </div>

      <div>test 점수:{point}</div>
    </>
  );
}

export default QuizResultPage;

const QuizWrapper = styled.div``;

const CommentWrapper = styled.div``;
