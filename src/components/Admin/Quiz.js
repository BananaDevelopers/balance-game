import { dbService, firebaseInstance } from "fbase";
import React, { useState } from "react";

<<<<<<< HEAD
const Quiz  = ({id, title, QuizL, QuizLCount, QuizR,  QuizRCount, gameId}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [gameTitle, setGameTitle] = useState(title)
    const [gameQuizL, setGameQuizL] = useState(QuizL)
    const [gameQuizR, setGameQuizR] = useState(QuizR)
=======
const Quiz = ({ id, title, QuizL, QuizLCount, QuizR, QuizRCount, gameId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [gameTitle, setGameTitle] = useState(title);
  const [gameQuizL, setGameQuizL] = useState(QuizL);
  const [gameQuizR, setGameQuizR] = useState(QuizR);
>>>>>>> bc7aec5ac568c9f36e61652dcc55bbf92c550d03

  const onEditClick = () => {
    if (isEditing) {
      // 완료
      dbService
        .collection("quiz")
        .doc(id)
        .update({
          title: gameTitle,
          QuizL: gameQuizL,
          QuizR: gameQuizR,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
    setIsEditing(!isEditing);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this quiz?");
    if (ok) {
      // quiz collection에서 삭제
      await dbService
        .doc(`quiz/${id}`)
        .delete()
        .then(() => {
          console.log("삭제함");
        });

<<<<<<< HEAD
            // game 배열에서도 id 삭제
            await dbService.collection("game").doc(gameId).update({
                quizzes: firebaseInstance.firestore.FieldValue.arrayRemove(id),
            });
            // ref 삭제는 안됨 (ref 넘겨줌)
            // await dbService.collection("game").doc(gameId).update({
            //     quizzes: firebaseInstance.firestore.FieldValue.arrayRemove(`game/${id}`),
            //   });
        }
=======
      // game 배열에서도 id 삭제
      await dbService.doc(`game/${gameId}`).update({
        quizzes: firebaseInstance.firestore.FieldValue.arrayRemove(id),
      });
>>>>>>> bc7aec5ac568c9f36e61652dcc55bbf92c550d03
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
      case "gameQuizL":
        setGameQuizL(value);
        break;
      case "gameQuizR":
        setGameQuizR(value);
        break;
      default:
        break;
    }
  };

  return (
    <li>
      <p>#{id}</p>
      {isEditing ? (
        <>
          <p>
            <input
              name="gameTitle"
              onChange={onChange}
              value={gameTitle}
              type="text"
              placeholder="퀴즈 제목"
            />
          </p>
          <p>
            <input
              name="gameQuizL"
              value={gameQuizL}
              onChange={onChange}
              type="text"
              placeholder="왼쪽 지문"
            />
          </p>
          <p>
            <input
              name="gameQuizR"
              value={gameQuizR}
              onChange={onChange}
              type="text"
              placeholder="오른쪽 지문"
            />
          </p>
        </>
      ) : (
        <>
          <p>{gameTitle}</p>
          <p>
            {gameQuizL}({QuizLCount})
          </p>
          <p>
            {gameQuizR}({QuizRCount})
          </p>
        </>
      )}
      <button onClick={onEditClick}>{isEditing ? "완료" : "편집"}</button>
      <button onClick={onDeleteClick}>삭제</button>
    </li>
  );
};

export default Quiz;
