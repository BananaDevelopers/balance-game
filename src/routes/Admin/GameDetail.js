import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { dbService } from "fbase";
import Quiz from "components/Admin/Quiz";

const GameDetail = () => {
  let params = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [clickedEditGame, setClickedEditGame] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setId(params.id);
    var gameRef = dbService.doc(`game/${params.id}`);
    if (gameRef) {
      gameRef.onSnapshot((observer) => {
          var game = observer.data();
          console.log(game) // 왜 undefined
          if(game != undefined){
            setTitle(game.title);
            game.quizzes.map((quizId)=>
              findQuizById(quizId)
            )
            setIsLoading(true);
          }
      });
    }

    return () => {};
  }, []);

  const findQuizById = (quizId) => {
    dbService.collection("quiz").doc(quizId)
    .get()
    .then(function(doc) {
        if (doc.exists) {
            const quizObj = {
              id: quizId,
              ...doc.data()
            }
            setQuizzes((prevQuizzes)=>[...prevQuizzes, quizObj])
            console.log("Document data:", quizObj);
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this game?");
    if (ok) {
      await dbService
        .doc(`game/${id}`)
        .delete()
        .then(() => {history.push("/gameList")});  // 게임리스트로 돌아가기가 안됌
    }
  };

  const onEditClick = () => {
    // history.push(`/editGame/${id}`);
    setClickedEditGame(!clickedEditGame)
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
            <button onClick={onEditClick}>{clickedEditGame? "완료":"게임 편집"}</button>
            <button onClick={onResultClick}>결과 보기</button>
            <button>퀴즈 추가</button>
          </div>
          <div>
            <p>퀴즈 목록</p>
            <ul>
              {quizzes.map((quiz) => (
                <>
                  <Quiz id={quiz.id} key={quiz.id} title = {quiz.title}
                    QuizL={quiz.QuizL} QuizLCount={quiz.QuizLCount}
                    QuizR={quiz.QuizR}  QuizRCount={quiz.QuizRCount} clickedEditGame = {clickedEditGame} />
                </>
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