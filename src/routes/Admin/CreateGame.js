import React, { useState } from "react";
import { dbService } from "fbase";
import { useHistory } from "react-router-dom";

const CreateGame = () => {
  const history = useHistory();

  const [gameTitle, setGameTitle] = useState("");
  const [titleFlag, setTitleFlag] = useState(false);

  const [quizTitle, setQuizTitle] = useState("");
  const [QuizL, setQuizL] = useState("");
  const [QuizR, setQuizR] = useState("");
  const [quizRefArray, setQuizRefArray] = useState([]);
  const [quizArray, setQuizArray] = useState([]);
  
  const [quizCount, setQuizCount] = useState(0);

  const MIN_QUIZ_COUNT = 2;

  const onSubmit = async (event) => {
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
          await dbService
            .collection("quiz")
            .add(quizObj)
            .then((docRef) => {
              setQuizRefArray([...quizRefArray, docRef])
            }); // ref 추가로 변경
          setQuizArray([...quizArray, quizObj]);
          setQuizCount(quizCount + 1);
          initAddQuizForm();
        } else {
          alert("빈칸 X!");
        }
        break;

      default:
        break;
    }
  };

  const initAddQuizForm = () => {
    setQuizTitle("");
    setQuizL("");
    setQuizR("");
  };

  const onAddGameClick = async () => {
    if (quizCount < MIN_QUIZ_COUNT) {
      alert("문제 더!");
    } else {
      const gameObj = {
        title: gameTitle,
        quizzes: quizRefArray,
        results: [],
        date: Date.now(),
      };
      await dbService
        .collection("game")
        .add(gameObj)
        .then(() => {
          history.push(`/gameList`);
        });
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    switch (event.target.name) {
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
  };

  const QuizList = ({ title, QuizL, QuizR }) => {
    return (
      <h5>
        {title} ? {QuizL} VS {QuizR}
      </h5>
    );
  };

  return (
    <>
      <h1>게임 추가</h1>
      {!titleFlag ? (
        <>
          <p>게임 이름</p>
          <form name="title" onSubmit={onSubmit}>
            <input
              name="gameTitle"
              value={gameTitle}
              onChange={onChange}
              type="text"
              placeholder="게임 이름"
            />
            <input type="submit" value="완료" />
          </form>
        </>
      ) : (
        <>
          <h5>게임 이름: {gameTitle}</h5>
          <form
            name="addQuiz"
            onSubmit={onSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "200px",
            }}
          >
            <input
              name="quizTitle"
              value={quizTitle}
              onChange={onChange}
              type="text"
              placeholder="퀴즈 이름"
            />
            <input
              name="QuizL"
              value={QuizL}
              onChange={onChange}
              type="text"
              placeholder="왼쪽 지문"
            />
            <input
              name="QuizR"
              value={QuizR}
              onChange={onChange}
              type="text"
              placeholder="오른쪽 지문"
            />
            <input type="submit" value="추가" />
          </form>
          <div>
            {quizArray.map((quizObj) => (
              <QuizList
                key={quizObj.date}
                title={quizObj.title}
                QuizL={quizObj.QuizL}
                QuizR={quizObj.QuizR}
              />
            ))}
          </div>
          <h5>추가된 문제 수 : {quizCount}</h5>
          <button onClick={onAddGameClick}>문제 추가</button>
        </>
      )}
    </>
  );
};

export default CreateGame;
