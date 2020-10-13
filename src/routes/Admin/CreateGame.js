import React, { useState } from "react";
import { dbService } from "fbase";
import { useHistory } from "react-router-dom";

const CreateGame = () => {
<<<<<<< HEAD
  const [user, setUser] = useState("");

  return <></>;
=======
  const history = useHistory();

  const [gameTitle, setGameTitle] = useState("");
  const [titleFlag, setTitleFlag] = useState(false);

  const [quizTitle, setQuizTitle] = useState("");
  const [QuizL, setQuizL] = useState("");
  const [QuizR, setQuizR] = useState("");
  const [quizArray, setQuizArray] = useState([]);

  const [quizCount, setQuizCount] = useState(0);
  const [gameArray, setGameArray] = useState([]);

  const onSubmit = async(event) => {
    event.preventDefault();

    switch (event.target.name) {
      case "title":
        setTitleFlag(true);
        break;
      case "addQuiz":
        if (QuizL !== "" && QuizR !== "" && quizTitle !== "") {
          const quizObj = {
            title: quizTitle,
            QuizL: QuizL,
            QuizR: QuizR,
            QuizLCount: 0,
            QuizRCount: 0,
            comments: [],
            date: Date.now(),
          };
          await dbService.collection("quiz").add(quizObj).then((docRef)=>(
            setGameArray([...gameArray, docRef.id])
          ));
          console.log(gameArray);
          setQuizArray([...quizArray, quizObj]);
          setQuizCount(quizCount + 1);
          setQuizTitle("");
          setQuizL("");
          setQuizR("");
          
        }
        else {
          alert("빈칸 X!");
        }
        break;
      case "addGame":
        if (quizCount < 2) {
          alert("문제 더!");
        }
        else {
          const gameObj = {
            title: gameTitle,
            quizzes: gameArray,
            results: [],
            date: Date.now(),
          };
          await dbService.collection("game").add(gameObj).then(()=>{
            history.push(`/gameList`);
          });
        }
        break;
      default:
        break;
    }

  }

  const onChange = (event) => {

    const {
      target: {value},
    } = event;

    switch(event.target.name) {
      case "gameTitle":
        setGameTitle(value);
        break;
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

  return (
    <>
      <h5>게임 이름</h5>
      {!titleFlag &&
        <form name="title" onSubmit={onSubmit}>
          <input name="gameTitle" value={gameTitle} onChange={onChange} type="text" placeholder="게임 이름" />
          <input type="submit" value="완료" />
        </form>
      }
      {titleFlag &&
        <>
          <form name="addQuiz" onSubmit={onSubmit} style= {
            {
              display : "flex", flexDirection: "column", width: "200px",
            }
          }>
            <input name="quizTitle" value={quizTitle} onChange={onChange} type="text" placeholder="퀴즈 이름" />
            <input name="QuizL" value={QuizL} onChange={onChange} type="text" placeholder="왼쪽 지문" />
            <input name="QuizR" value={QuizR} onChange={onChange} type="text" placeholder="오른쪽 지문" />
            <input type="submit" value="추가" />
          </form>
          <div>
            {quizArray.map((quizObj) =>
              <h5 key={quizObj.date}>{quizObj.title} ? {quizObj.QuizL} VS {quizObj.QuizR}</h5>
            )}
            <h5>추가된 문제 수 : {quizCount}</h5>
            <form name="addGame" onSubmit={onSubmit}>
              <input type="submit" value="문제 추가" />
            </form>
          </div>
        </>
      }
    </>
  );

>>>>>>> 8d287472a6747a7cfd139590f907fd9b732614cf
};

export default CreateGame;
