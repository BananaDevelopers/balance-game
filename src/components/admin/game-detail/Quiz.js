import { dbService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Quiz = ({ id, quizRef, title, QuizL, QuizLCount, QuizR, QuizRCount, gameId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [gameTitle, setGameTitle] = useState(title);
  const [gameQuizL, setGameQuizL] = useState(QuizL);
  const [gameQuizR, setGameQuizR] = useState(QuizR);
  const history = useHistory();

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
      // game에서 ref 삭제
      await dbService.collection("game").doc(gameId).update({
          quizzes: firebaseInstance.firestore.FieldValue.arrayRemove(quizRef),
      });

      // 해당 퀴즈 삭제
      await dbService
        .collection('quiz')
        .doc(id)
        .get()
        .then((quizDoc) => {
          if(quizDoc.exists){
            const commentIds = quizDoc.data().comments;
            // 퀴즈에 해당하는 댓글 삭제(comments 배열의 모든 아이디)
            deleteComments(commentIds)
          }
  
          // 해당 퀴즈 삭제
          dbService.collection('quiz').doc(id)
                  .delete()
                  .then((quizDoc)=>{
                    console.log("quiz"+quizDoc.id+" 삭제");
                  }).catch(function(error) {
                    console.error("Error removing document: ", error);
                  });
        });
    }
  };

  const deleteComments = (commentIds) => {
    if(commentIds.length > 0){
      commentIds.map((cid)=>{
        dbService.collection("comment")
        .doc(cid).get().then((commentDoc)=>{
          if(commentDoc.exists){
            const replyIds = commentDoc.data().reply;
            // 대댓글 삭제(reply 배열의 모든 아이디)
            deleteReplyComments(replyIds);

            // 해당 댓글 삭제
            dbService.collection("comment")
                    .doc(cid)
                    .delete()
                    .then(()=>{
                      console.log("comment"+cid+" 삭제");
                    }).catch(function(error) {
                      console.error("Error removing document: ", error);
                    });;
          }
        })

      })
    }
  }
  
  const deleteReplyComments = (replyIds) => {
    if(replyIds.length > 0){
      replyIds.map((rid)=>{
        dbService.collection("replyComment")
                  .doc(rid)
                  .delete()
                  .then(()=>{
                    console.log("replyComment"+rid+" 삭제");
                  }).catch(function(error) {
                    console.error("Error removing document: ", error);
                  });
      });
    }
  }

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

  const onViewCommentClick = () => {
    history.push("/gameList");
  }

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
      <button onClick={onViewCommentClick}>댓글보기</button>
    </li>
  );
};

export default Quiz;
