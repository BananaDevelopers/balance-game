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
  const [isAddQuiz, setIsAddQuiz] = useState(false);

  const [quizTitle, setQuizTitle] = useState("");
  const [QuizL, setQuizL] = useState("");
  const [QuizR, setQuizR] = useState("");
  const [quizIDs, setQuizIDs] = useState([]);

  const [first, setFirst] = useState(true);

  const onChange = (event) => {

    const {
      target: {value},
    } = event;

    switch(event.target.name) {
      case "quizTitle":
        setQuizTitle(value);
        break;
      case "QuizL":
        setQuizL(value);
        break;
      case "QuizR":
        setQuizR(value);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setId(params.id);
    let gameRef = dbService.doc(`game/${params.id}`);
    if (gameRef) {
      gameRef.onSnapshot((observer) => {
        let game = observer.data();
        console.log(game) // 왜 undefined
        if(game !== undefined){
          setTitle(game.title);
          if (first) {
            game.quizzes.map((quizId)=>
              setQuizIDs((prevQuizIDs) => [...prevQuizIDs, quizId])
            )
            setFirst(false);
          }
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

  const onAddQuizClick = () => {
    setIsAddQuiz(true);
  }

  const onSubmit = async(event) => {
    event.preventDefault();

    let quizObj = {
      title: quizTitle,
      QuizL: QuizL,
      QuizR: QuizR,
      QuizLCount: 0,
      QuizRCount: 0,
      comments: [],
      date: Date.now(),
    };

    let quizID;

    await dbService.collection("quiz").add(quizObj).then((docRef)=>(
      quizObj = {
        id: docRef.id,
        ...quizObj,
      }
    ));

    console.log(quizObj);

    setQuizzes((prevQuizzes)=>[...prevQuizzes, quizObj]);
    setQuizIDs((prevQuizIDs) => [...prevQuizIDs, quizObj.id]);

    console.log(quizIDs);
    
    await dbService.doc(`game/${id}`).update({
      quizzes: quizIDs,
    })

  }

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
            <button onClick={onAddQuizClick}>퀴즈 추가</button>
          </div>
          {isAddQuiz &&
          <form onSubmit={onSubmit} style= {
            {
              display : "flex", flexDirection: "column", width: "200px",
            }
          }>
            <input name="quizTitle" value={quizTitle} onChange={onChange} type="text" placeholder="퀴즈 이름" />
            <input name="QuizL" value={QuizL} onChange={onChange} type="text" placeholder="왼쪽 지문" />
            <input name="QuizR" value={QuizR} onChange={onChange} type="text" placeholder="오른쪽 지문" />
            <input type="submit" value="추가" />
          </form>
          }
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