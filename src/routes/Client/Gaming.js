import React, { useState, useEffect, useRef,useReducer } from "react";
import Progress from "react-progressbar";
import Choice from "components/Client/Choice";
import QuizResult from "components/Client/QuizResult";
import WriteComment from "components/Client/WriteComment";
import Comment from "components/Client/Comment";
import { dbService } from "fbase";
import { useHistory } from "react-router-dom";

const initialState = {
  comments:[],
  left:2,
}
export const ADD_COMMENT = 'ADD_COMMENT'
export const DEL_COMMENT = 'DEL_COMMENT'
export const SET_COMMENT = 'SET_COMMENT'
export const SET_LEFT = 'SET_LEFT'

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_COMMENT:{
      console.log(ADD_COMMENT)
      console.log(action.cmtObj)
      return{
        ...state,
        comments:[action.cmtObj, ...state.comments]
      }
    }
    case DEL_COMMENT:{
      console.log("del",action.cmtObj)
      return{
        ...state,
        comments: state.comments.filter(c => c != action.cmtObj)
      }
    }
    case SET_COMMENT:{
      return{
        comments:[]
      }
    }
    case SET_LEFT:{
      return{
        ...state,
        left:action.flag,
      }
    }
  }
}

const Gaming = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { comments,left } = state;

  const [progress, setProgress] = useState(0);
  const timer = useRef();
  const [quizs, setQuizs] = useState(null);
  const [num, setNum] = useState(0);
  //const [comments, setComments] = useState([]);
  const [resultFlag, setResultFlag] = useState(false);
  const [point, setPoint] = useState(0);
  const [comment,setComment]=useState('');
  const history = useHistory();

  useEffect(() => {
    console.log("use1");
    dbService.collection("quiz").onSnapshot((snapshot) => {
      const quizArray = snapshot.docs.map((doc) => ({
        docid: doc.id,
        ...doc.data(),
      }));
      console.log(quizArray);
      setQuizs(quizArray);
    });
  }, []);

  useEffect(() => {
    console.log("num", num);
    if (resultFlag) return;
    if (progress < 100)
      timer.current = setTimeout(() => {
        setProgress((prevProgress) => {
          return prevProgress + 20;
        });
      }, 1000);
    else {
      setPoint((prev) => prev + 1); //시간초과 +1
      if (num <= quizs.length - 1) {
        quizs[num].comments.map((c)=>dispatch({ type: ADD_COMMENT, cmtObj:c }))
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
    if (flag === 0){
      dispatch({type:SET_LEFT, flag:0})
      await dbService.doc(`quiz/${quizs[num].docid}`).update({
        QuizLCount: quizs[num].QuizLCount + 1,
      });
    }
    else{
      dispatch({type:SET_LEFT, flag:1})
      await dbService.doc(`quiz/${quizs[num].docid}`).update({
        QuizRCount: quizs[num].QuizRCount + 1,
      });
    }
    if (num <= quizs.length - 1) {
      quizs[num].comments.map((c)=>dispatch({ type: ADD_COMMENT, cmtObj:c }))
      setResultFlag(true);
    }
  };

  const setQuiz =async () => {
    setProgress(0);
    //댓글
    dispatch({ type: SET_COMMENT })
    
  };


  const onChange = e => {
    const { target: { value } } = e;
    setComment(value);
  };


  return (
    <>
      <div>
        Quiz {num + 1}/{quizs?.length}
      </div>
      <div>{quizs !== null ? quizs[num].title : ""}</div>
      {!resultFlag && <Progress completed={progress} />}
      <div onClick={() => choiceClick(0)}>
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
      </div>
      {!resultFlag && <p>vs</p>}
      <div onClick={() => choiceClick(1)}>
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
      </div>
      <div>
        {resultFlag && <div>
        <p>***temp comments***</p>
        <WriteComment dispatch={dispatch} quizObj={quizs[num]} propleft={left} />
        </div>
        }
        <br />
        {resultFlag && comments.length !== 0
          ? comments.map((c) => <Comment cmtObj={c} quizObj={quizs[num]} dispatch={dispatch}/>)
          : ""}
      </div>
      <div>{resultFlag && <button onClick={nextClick}>next</button>}</div>

      <div>점수:{point}</div>
    </>
  );
};

export default Gaming;
