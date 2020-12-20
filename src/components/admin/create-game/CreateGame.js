import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { dbService } from "fbase";

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
  const [resultCount, setResultCount] = useState(0);

  const [resultTitle, setResultTitle] = useState("");
  const [resultDescription, setResultDescription] = useState("");
  const [resultRefArray, setResultRefArray] = useState([]);
  const [resultArray, setResultArray] = useState([]);

  const MIN_QUIZ_COUNT = 2;
  const MIN_RESULT_COUNT = 2;

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
              setQuizRefArray([...quizRefArray, docRef]);
            }); // ref 추가로 변경
          setQuizArray([...quizArray, quizObj]);
          setQuizCount(quizCount + 1);
          initAddQuizForm();
        } else {
          alert("빈칸 X!");
        }
        break;
      case "addResult":
        if (resultTitle !== "" && resultDescription !== "") {
          const ResultObj = {
            title: resultTitle,
            description: resultDescription,
            date: Date.now(),
          };
          await dbService
            .collection("result")
            .add(ResultObj)
            .then((docRef) => {
              setResultRefArray([...resultRefArray, docRef]);
            });
          setResultArray([...resultArray, ResultObj]);
          setResultCount(resultCount + 1);
          initAddResultForm();
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

  const initAddResultForm = () => {
    setResultTitle("");
    setResultDescription("");
  };

  const onAddGameClick = async () => {
    if (quizCount < MIN_QUIZ_COUNT || resultCount < MIN_RESULT_COUNT) {
      alert(`퀴즈 ${MIN_QUIZ_COUNT}개 이상, 결과 ${MIN_RESULT_COUNT} 이상!`);
    } else {
      const gameObj = {
        title: gameTitle,
        quizzes: quizRefArray,
        results: resultRefArray,
        date: Date.now(),
        imgUrl: "",
      };
      await dbService
        .collection("game")
        .add(gameObj)
        .then(() => {
          history.push(`/admin/game-list`);
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
      case "resultTitle":
        setResultTitle(value);
        break;
      case "resultDescription":
        setResultDescription(value);
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

  const ResultList = ({ title, description }) => {
    return (
      <h5>
        {title} : {description}
      </h5>
    );
  };

  return (
    <>
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
          <form name="addResult" onSubmit={onSubmit}>
            <input
              name="resultTitle"
              value={resultTitle}
              onChange={onChange}
              type="text"
              placeholder="결과 제목"
            />
            <input
              name="resultDescription"
              value={resultDescription}
              onChange={onChange}
              type="text"
              placeholder="결과 설명"
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
          <div>
            {resultArray.map((resultObj) => (
              <ResultList
                key={resultObj.date}
                title={resultObj.title}
                description={resultObj.description}
              />
            ))}
          </div>
          <h5>추가된 문제 수 : {quizCount}</h5>
          <button onClick={onAddGameClick}>게임 생성</button>
        </>
      )}
    </>
  );
};

export default CreateGame;
