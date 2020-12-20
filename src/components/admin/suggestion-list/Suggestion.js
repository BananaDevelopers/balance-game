import { dbService } from "fbase";
import React, { useState } from "react";

const Suggestion = ({ id, quizName, quizL, quizR }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newQuizName, setNewQuizName] = useState(quizName);
  const [newQuizL, setNewQuizL] = useState(quizL);
  const [newQuizR, setNewQuizR] = useState(quizR);

  const onEditClick = () => {
    if (isEditing) {
        dbService.collection("Suggestions").doc(id).update({
            quizName: newQuizName,
            quizL: newQuizL,
            quizR: newQuizR
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    setIsEditing(!isEditing);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm(
      "Are you sure you want to delete this suggestion?"
    );
    if (ok) {
      await dbService
        .doc(`Suggestions/${id}`)
        .delete()
        .then(() => {
          console.log("suggestion 삭제함");
        });
    }
  };

  const onChange = (event) => {
    const {
      target: {value},
    } = event;

    switch(event.target.name) {
        case "newQuizName":
            setNewQuizName(value);
            break;
        case "newQuizL":
            setNewQuizL(value);
            break;
        case "newQuizR":
            setNewQuizR(value);
            break;
        default:
            break;
    }
  }


  return (
    <li>
      {id}
      {isEditing ? (
        <>
        <p>제목: <input name="newQuizName" type="text" onChange={onChange} value={newQuizName} placeholder="퀴즈 제목"/></p>
          <p>option1: <input name="newQuizL" type="text" onChange={onChange} value={newQuizL} placeholder="왼쪽 지문"/></p>
          <p>option2: <input name="newQuizR" type="text" onChange={onChange} value={newQuizR} placeholder="오른쪽 지문"/></p>
        </>
      ) : (
        <>
          <p>제목: {newQuizName}</p>
          <p>option1: {newQuizL}</p>
          <p>option2: {newQuizR}</p>
        </>
      )}
      <button onClick={onEditClick}>{isEditing ? "완료" : "편집"}</button>
      <button onClick={onDeleteClick}>삭제</button>
    </li>
  );
};

export default Suggestion;
