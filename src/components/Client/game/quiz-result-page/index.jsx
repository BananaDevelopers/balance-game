import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { dbService } from "fbase";

import QuizResult from "./QuizResult";
import WriteComment from "components/client/game/quiz-result-page/comment/WriteComment";
import Comment from "components/client/game/quiz-result-page/comment/Comment";

import { LEFT, RIGHT } from "../quiz-select-page/Quiz";

function QuizResultPage({ selection = LEFT, quiz, point, onClickNext }) {
  const [quizCommentIds, setQuizCommentIds] = useState(
    quiz.comments ? quiz.comments : []
  );

  const totalResponseCount =
    parseInt(quiz.QuizLCount) + parseInt(quiz.QuizRCount);

  const addComment = async (_comment) => {
    console.log(_comment);
    await dbService
      .collection("comment")
      .add(_comment)
      .then((res) => {
        const newCommentIds = [res.id, ...quizCommentIds];
        console.log(newCommentIds);
        dbService.doc(`quiz/${quiz.id}`).update({
          comments: newCommentIds,
        });
        setQuizCommentIds(newCommentIds); //ui update
      });
  };

  const deleteComment = async (cid) => {
    const _comment = await dbService.doc(`comment/${cid}`).get();

    const reply = _comment.data().reply;
    reply.map(async (rid) => {
      await dbService.doc(`replyComment/${rid}`).delete();
    });

    await dbService.doc(`comment/${cid}`).delete();
    const updatedQuizCommentIds = quizCommentIds.filter((id) => id !== cid);
    await dbService
      .doc(`quiz/${quiz.id}`)
      .update({
        comments: updatedQuizCommentIds,
      })
      .then(setQuizCommentIds(updatedQuizCommentIds));
  };

  return (
    <>
      <QuizWrapper>
        <QuizResult
          quizText={quiz.QuizL}
          count={quiz.QuizLCount}
          totalCount={totalResponseCount}
          isSelected={selection === LEFT}
        />
        <QuizResult
          quizText={quiz.QuizR}
          count={quiz.QuizRCount}
          totalCount={totalResponseCount}
          isSelected={selection === RIGHT}
        />
      </QuizWrapper>
      <WriteComment selection={selection} addComment={addComment} />
      <CommentWrapper>
        {quizCommentIds?.map((id) => (
          <Comment
            key={id}
            commentId={id}
            deleteComment={deleteComment}
            selection={selection}
          />
        ))}
      </CommentWrapper>
      <NextButton onClick={onClickNext}>Next</NextButton>
      <div>(test_div) 점수:{point}</div>
    </>
  );
}

export default QuizResultPage;

const QuizWrapper = styled.div``;

const CommentWrapper = styled.div``;

const NextButton = styled.button``;
