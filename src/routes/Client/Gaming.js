import React, { useState, useEffect, useRef, useReducer } from "react";
import styled from "styled-components";
import Progress from "react-progressbar";
import ProgessBar from "@ramonak/react-progress-bar";
import Choice from "components/Client/Choice";
import QuizResult from "components/Client/QuizResult";
import WriteComment from "components/Client/WriteComment";
import Comment from "components/Client/Comment";
import { dbService } from "fbase";
import { useHistory } from "react-router-dom";

const GamingContainer = styled.div`
  padding: 50px 0px;
  background-color: #6eb2f3;
`;

const QuizNumber = styled.span`
  margin: 0px 20px;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  background-color: #ff6a72;
  color: #f2f2f2;
`;

const QuizTitle = styled.div`
  margin: 20px 20px;
  padding: 24px 32px;
  border-radius: 6px;
  font-size: 18px;
  background-color: #3e6991;
  color: #f2f2f2;
`;

const ProgressContainer = styled.div`
  margin: 0px 20px;
`;

const QuizLeftContainer = styled.div`
  margin-top: 20px;
  width: 80%;
  height: 28vh;
  background-color: #f6fafe;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

const QuizRightContainer = styled.div`
  margin-left: 6vw;
  width: 80%;
  height: 28vh;
  background-color: #f6fafe;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  font-size: 18px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const VersusText = styled.div`
  font-size: 60px;
  color: #ff5e57;
  text-align: center;
  margin-bottom: 16px;
`;

const initialState = {
  comments: [],
  left: 2,
};

export const ADD_COMMENT = "ADD_COMMENT";
export const DEL_COMMENT = "DEL_COMMENT";
export const SET_COMMENT = "SET_COMMENT";
export const SET_LEFT = "SET_LEFT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

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
        comments: state.comments.filter((c) => c != action.cmtObj),
      };
    }
    case SET_COMMENT: {
      return {
        comments: [],
      };
    }
    case SET_LEFT: {
      return {
        ...state,
        left: action.flag,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const Gaming = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { comments, left } = state;
  const [progress, setProgress] = useState(0);
  const timer = useRef();
  const [quizs, setQuizs] = useState(null);
  const [num, setNum] = useState(0);
  const [resultFlag, setResultFlag] = useState(false);
  const [point, setPoint] = useState(0);
  const [commentArray, setCommentArray] = useState(comments);
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
    console.log("여기");
    updateComments();
  }, [comments]);

  useEffect(() => {
    if (resultFlag) return;
    if (progress < 100)
      timer.current = setTimeout(() => {
        setProgress((prevProgress) => {
          return prevProgress + 5;
        });
      }, 2000);
    else {
      setPoint((prev) => prev + 1); //시간초과 +1
      if (num <= quizs.length - 1) {
        quizs[num].comments.map((c) =>
          dispatch({ type: ADD_COMMENT, cmtObj: c })
        );
        setResultFlag(true);
      }
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [progress]);

  const nextClick = () => {
    if (num < quizs.length - 1) {
      setNum((prev) => prev + 1);
      setQuiz();
      setResultFlag(false);
    }

    if (num === quizs.length - 1) {
      history.push("/game/result");
    }
  };

  const choiceClick = async (flag) => {
    if (resultFlag) {
      return;
    }
    if (quizs[num].QuizLCount > quizs[num].QuizRCount) {
      if (flag === 0) {
        setPoint((prev) => prev + 2); //다수선택 +2
      }
    } else if (quizs[num].QuizLCount < quizs[num].QuizRCount) {
      if (flag === 1) {
        setPoint((prev) => prev + 2); //다수선택 +2
      }
    } else if (quizs[num].QuizLCount === quizs[num].QuizRCount) {
      setPoint((prev) => prev + 1); //동점선택 +1
    }
    if (flag === 0) {
      dispatch({ type: SET_LEFT, flag: 0 });
      await dbService.doc(`quiz/${quizs[num].docid}`).update({
        QuizLCount: quizs[num].QuizLCount + 1,
      });
    } else {
      dispatch({ type: SET_LEFT, flag: 1 });
      await dbService.doc(`quiz/${quizs[num].docid}`).update({
        QuizRCount: quizs[num].QuizRCount + 1,
      });
    }
    if (num <= quizs.length - 1) {
      quizs[num].comments.map((c) =>
        dispatch({ type: ADD_COMMENT, cmtObj: c })
      );
      setResultFlag(true);
    }
  };

  const setQuiz = async () => {
    setProgress(0);
    //댓글
    dispatch({ type: SET_COMMENT });
  };

  const updateComments = () =>
    comments.map((c) => (
      <Comment cmtObj={c} quizObj={quizs[num]} dispatch={dispatch} />
    ));

  return (
    <GamingContainer>
      <QuizNumber>
        문제 {num + 1} / {quizs?.length}
      </QuizNumber>
      <QuizTitle>{quizs !== null ? quizs[num].title : ""}</QuizTitle>
      {!resultFlag && (
        <ProgressContainer>
          <ProgessBar
            completed={progress}
            bgcolor={"#ffdd59"}
            height={"20px"}
            color={"#fad390"}
            labelAlignment={"outside"}
            baseBgColor={"#F6FAFE"}
          />
        </ProgressContainer>
      )}
      <QuizLeftContainer onClick={() => choiceClick(0)}>
        {!resultFlag && quizs !== null ? (
          <Choice text={quizs[num].QuizL} />
        ) : (
          ""
        )}
        {resultFlag && quizs !== null ? (
          <QuizResult obj={quizs[num]} flag={0} />
        ) : (
          ""
        )}
      </QuizLeftContainer>
      {!resultFlag && <VersusText>vs</VersusText>}
      <QuizRightContainer onClick={() => choiceClick(1)}>
        {!resultFlag && quizs !== null ? (
          <Choice text={quizs[num].QuizR} />
        ) : (
          ""
        )}
        {resultFlag && quizs !== null ? (
          <QuizResult obj={quizs[num]} flag={1} />
        ) : (
          ""
        )}
      </QuizRightContainer>
      <div>
        {resultFlag && (
          <div>
            <p>***temp comments***</p>
            <WriteComment
              dispatch={dispatch}
              quizObj={quizs[num]}
              propleft={left}
            />
          </div>
        )}
        <br />
        {resultFlag && comments.length !== 0 ? updateComments() : ""}
      </div>
      <div>{resultFlag && <button onClick={nextClick}>next</button>}</div>

      <div>점수:{point}</div>
    </GamingContainer>
  );
};

export default Gaming;
