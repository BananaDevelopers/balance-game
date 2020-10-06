import React, { useState, useEffect, useRef } from "react";
import Progress from "react-progressbar";
import Choice from "components/Client/Choice";
import QuizResult from "components/Client/QuizResult";
import { dbService } from "fbase";
import { useHistory } from "react-router-dom";

const Gaming = () => {
  const [progress, setProgress] = useState(0);
  const timer = useRef();
  const [quizs, setQuizs] = useState(null);
  const [num, setNum] = useState(0);
  const [comments, setComments] = useState([]);
  const [resultFlag, setResultFlag] = useState(false);
  const [point, setPoint] = useState(0);
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
        setResultFlag(true);
      }
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [progress]);

  const setQuiz = () => {
    setProgress(0);
    //댓글
  };

  const nextClick = () => {
    console.log(123);
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
    if (flag === 0)
      await dbService.doc(`quiz/${quizs[num].docid}`).update({
        QuizLCount: quizs[num].QuizLCount + 1,
      });
    else
      await dbService.doc(`quiz/${quizs[num].docid}`).update({
        QuizRCount: quizs[num].QuizRCount + 1,
      });
    if (num <= quizs.length - 1) {
      setResultFlag(true);
    }
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
        {resultFlag && <p>***temp comments***</p>}
        {resultFlag && comments.length !== 0
          ? comments.map((c) => <p>{c.description}</p>)
          : ""}
      </div>
      <div>{resultFlag && <button onClick={nextClick}>next</button>}</div>

      <div>점수:{point}</div>
    </>
  );
};

export default Gaming;
