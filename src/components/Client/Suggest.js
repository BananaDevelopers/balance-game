import React, { useState } from "react";
import { dbService } from "fbase";

function Suggest({ SuggestionObj }) {
  const [quizName, setQuizName] = useState("");
  const [quizL, setQuizL] = useState("");
  const [quizR, setQuizR] = useState("");
  const [editing, setEditing] = useState(false);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await dbService.doc(`Suggestions/${SuggestionObj.id}`).delete();
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .doc(`Suggestions/${SuggestionObj.id}`)
      .update({ quizName, quizL, quizR });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "quizName") {
      setQuizName(value);
    } else if (name === "quizL") {
      setQuizL(value);
    } else if (name === "quizR") {
      setQuizR(value);
    }
  };
  
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your QuizName"
              value={quizName}
              name="quizName"
              required
              onChange={onChange}
            />
            <input
              type="text"
              placeholder="Edit your QuizL"
              value={quizL}
              name="quizL"
              required
              onChange={onChange}
            />
            <input
              type="text"
              placeholder="Edit your QuizR"
              value={quizR}
              name="quizR"
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Suggestion" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h4>
            QuizName : {SuggestionObj.quizName} QuizL : {SuggestionObj.quizL}
            QuizR : {SuggestionObj.quizR}
          </h4>
          <>
            <button
              style={{ marginLeft: "4px", height: "24px" }}
              onClick={onDeleteClick}
            >
              Delete Suggestion
            </button>
            <button
              style={{ marginLeft: "4px", height: "24px" }}
              onClick={toggleEditing}
            >
              Edit Suggestion
            </button>
          </>
        </div>
      )}
    </div>
  );
}

export default Suggest;
