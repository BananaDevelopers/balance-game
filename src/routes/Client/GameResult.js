import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

function GameResult() {
  const [quizL, setQuizL] = useState("");
  const [quizR, setQuizR] = useState("");
  const [quizName, setQuizName] = useState("");
  const [game, setGame] = useState([]);

  useEffect(() => {
    dbService.collection("game").onSnapshot((snapshot) => {
      const gameArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGame(gameArray);
    });
    return () => {};
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("Suggestions").add({
      quizL,
      quizR,
      quizName,
      createdAt: Date.now(),
    });
    setQuizL("");
    setQuizR("");
    setQuizName("");
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "quizL") {
      setQuizL(value);
    } else if (name === "quizR") {
      setQuizR(value);
    } else if (name === "quizName") {
      setQuizName(value);
    }
  };

  return (
    <div>
      <div>
        {game.map((quiz) => {
          console.log(quiz);
          return (
            <div
              key={quiz.title}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {quiz.title} {quiz.quizList}
            </div>
          );
        })}
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={quizName}
          name="quizName"
          placeholder="QuizName"
          maxLength={20}
          onChange={onChange}
        />
        <input
          type="text"
          name="quizL"
          value={quizL}
          placeholder="QuizL"
          maxLength={40}
          onChange={onChange}
        />
        <input
          type="text"
          name="quizR"
          value={quizR}
          placeholder="QuizR"
          maxLength={40}
          onChange={onChange}
        />
        <input type="submit" value="Suggestion" />
      </form>
    </div>
  );
}

export default GameResult;
