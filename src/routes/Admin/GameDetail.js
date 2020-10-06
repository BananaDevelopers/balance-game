import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { dbService } from "fbase";

const GameDetail = () => {
  let params = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [quizzes, setQuizzes] = useState([
    {
      id: 1111,
      title: "문제1입니당?",
      QuizL: "왼쪽 문제요",
      QuizR: "오른쪽 문제요",
      QuizLCount: 75,
      QuizRCount: 25,
      comments: [],
      date: "2020-12-05",
    },
    {
      id: 2222,
      title: "문제2입니당?",
      QuizL: "왼쪽 문제요",
      QuizR: "오른쪽 문제요",
      QuizLCount: 50,
      QuizRCount: 50,
      comments: [],
      date: "2020-12-05",
    },
    {
      id: 3333,
      title: "문제3입니당?",
      QuizL: "왼쪽 문제요",
      QuizR: "오른쪽 문제요",
      QuizLCount: 60,
      QuizRCount: 40,
      comments: [],
      date: "2020-12-05",
    },
  ]);

  useEffect(() => {
    setId(params.id);
    var gameRef = dbService.doc(`game/${params.id}`);
    // if (gameRef) {
    gameRef.onSnapshot((observer) => {
      var game = observer.data();
      setTitle(game.title);
      setIsLoading(true);
    });
    // }

    return () => {};
  }, []);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this game?");
    // if (ok) {
    //   await dbService
    //     .doc(`game/${id}`)
    //     .delete()
    //     .then(history.push("/gameList"));  // 게임리스트로 돌아가기가 안됌
    // }
  };

  const onEditClick = () => {
    history.push(`/editGame/${id}`);
  };

  const onResultClick = () => {
    history.push(`/results/${id}`);
  };

  return (
    <div>
      {isLoading ? (
        <>
          <h1>게임 상세보기</h1>
          <div>
            <h5>#{id}</h5>
            <h2>{title}</h2>
          </div>
          <div>
            <button onClick={onDeleteClick}>게임 삭제</button>
            <button onClick={onEditClick}>게임 편집</button>
            <button onClick={onResultClick}>결과 보기</button>
            <button>퀴즈 추가</button>
          </div>
          <div>
            <p>퀴즈 목록</p>
            <ul>
              {quizzes.map((quiz) => (
                <li>
                  <p>#{quiz.id}</p>
                  <p>{quiz.title}</p>
                  <p>
                    {quiz.QuizL}({quiz.QuizLCount})
                  </p>
                  <p>
                    {quiz.QuizR}({quiz.QuizRCount})
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GameDetail;
