import React, { useState, useEffect, useReducer } from "react";
import { dbService } from "fbase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import GameHeader from "./header";
import Comment from "components/client/game/comment/Comment";
import QuizSelectPage from "./quiz-select-page";
import QuizResultPage from "./quiz-result-page";
import { LEFT, RIGHT } from "./quiz-select-page/Quiz";

const initialState = {
  selection: 0, // -1: LEFT, 1: RIGHT
  point: 0,
  resultFlag: false,
  comments: [],
};

export const ADD_COMMENT = "ADD_COMMENT";
export const DEL_COMMENT = "DEL_COMMENT";
export const SET_COMMENT = "SET_COMMENT";

export const UPDATE_COMMENT = "UPDATE_COMMENT";

export const SET_SELECTION = "SET_SELECTION";
export const SET_POINT = "SET_POINT";
export const SET_RESULT_FLAG = "SET_RESULT_FLAG";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_COMMENT: {
      return {
        ...state,
        comments: [action.cmtObj, ...state.comments],
      };
    }
    case UPDATE_COMMENT: {
      return {
        ...state,
        comments: [...state.comments],
      };
    }
    case DEL_COMMENT: {
      return {
        ...state,
        comments: state.comments.filter((c) => c !== action.cmtObj),
      };
    }
    case SET_COMMENT: {
      return {
        ...state,
        comments: [],
      };
    }

    case SET_SELECTION: {
      return {
        ...state,
        selection: action.selection,
      };
    }
    case SET_POINT: {
      // 점수 계산
      const { selection } = state;
      const { quizLCount, quizRCount } = action;
      var p = 0;
      if (
        (quizLCount > quizRCount && selection === LEFT) ||
        (quizLCount < quizRCount && selection === RIGHT)
      ) {
        p = 2; //다수선택 +2
      } else if (quizLCount === quizRCount) {
        p = 1; //동점선택 +1
      }
      return {
        ...state,
        point: state.point + p,
      };
    }
    case SET_RESULT_FLAG: {
      return {
        ...state,
        resultFlag: action.resultFlag,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

function Gaming() {
  const [{ selection, point, resultFlag, comments }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [quizs, setQuizs] = useState(null);
  const [num, setNum] = useState(0);
  const history = useHistory();

  useEffect(() => {
    dbService.collection("quiz").onSnapshot((snapshot) => {
      const quizArray = snapshot.docs.map((doc) => ({
        docid: doc.id,
        ...doc.data(),
      }));
      setQuizs(quizArray);
    });
  }, []);

  useEffect(() => {
    updateComments();
  }, [comments]);

  const nextClick = () => {
    if (num < quizs.length - 1) {
      setNum((prev) => prev + 1);
      setQuiz();
      dispatch({ type: SET_RESULT_FLAG, resultFlag: false });
    }

    if (num === quizs.length - 1) {
      history.push("/game/result");
    }
  };

  const setQuiz = async () => {
    dispatch({ type: SET_COMMENT }); //댓글
  };

  const updateComments = () =>
    comments.map((c) => (
      <Comment cmtObj={c} quizObj={quizs[num]} dispatch={dispatch} />
    ));

  return (
    <GamingContainer>
      <GameHeader
        num={num}
        quizesLength={quizs ? quizs.length : ""}
        quizTitle={quizs ? quizs[num].title : ""}
      />
      {!resultFlag ? (
        <QuizSelectPage quiz={quizs ? quizs[num] : null} dispatch={dispatch} />
      ) : (
        <QuizResultPage
          selection={selection}
          dispatch={dispatch}
          quiz={quizs ? quizs[num] : null}
          nextClick={nextClick}
          commentsLength={comments.length}
          updateComments={updateComments}
          point={point}
        />
      )}
    </GamingContainer>
  );
}

export default Gaming;

const GamingContainer = styled.div`
  padding: 50px 0px;
  background-color: #6eb2f3;
`;
