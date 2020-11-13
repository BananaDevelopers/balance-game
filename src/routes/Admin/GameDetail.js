import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { dbService, firebaseInstance } from "fbase";
import Quiz from "components/Admin/Quiz";

const GameDetail = () => {
  let params = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [editingGame, setEditingGame] = useState(false);

  const [gameId, setGameId] = useState("");
  const [title, setTitle] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [isAddQuiz, setIsAddQuiz] = useState(false);

  const [quizTitle, setQuizTitle] = useState("");
  const [QuizL, setQuizL] = useState("");
  const [QuizR, setQuizR] = useState("");
  
  useEffect(() => {
    setGameId(params.id);
    let gameRef = dbService.collection("game").doc(params.id); 
    gameRef.onSnapshot((doc)=>{
      if(doc.exists){
        let gameObj = doc.data()
        setTitle(gameObj.title)
        setQuizzes([]);
        gameObj.quizzes.map((quizRef) => {
          findQuizByRef(quizRef)
        });
        setIsLoading(true);
      }
    })
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    switch (event.target.name) {
      case "gameTitle":
        setTitle(value);
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

  // ref로 quiz 가져오기
  const findQuizByRef = (quizRef) => {
    quizRef.get().then((doc) => {
        if (doc.exists) {
          const quizObj = {
            id: quizRef.id,
            ref: quizRef,
            ...doc.data(),
          };
          setQuizzes((prevQuizzes) => [...prevQuizzes, quizObj]);
          console.log("Document data:", quizObj);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("게임을 삭제하면 관련 퀴즈와 댓글도 모두 삭제됩니다. 그래도 삭제하시겠습니까?");
    if (ok) {
      await dbService
        .collection("game")
        .doc(gameId)
        .get()
        .then((doc) => {
          if(doc.exists){
            const quizRefs = doc.data().quizzes;
            deleteQuizzes(quizRefs);
          }

          dbService.collection("game")
          .doc(gameId)
          .delete()
          .then(()=>{
            console.log("game"+ gameId+" 삭제");
          }).catch(function(error) {
            console.error("Error removing document: ", error);
          });

          history.push("/gameList");
        }); 
    }
  };

  const deleteQuizzes = (quizRefs) => {
    if(quizRefs.length > 0){
      quizRefs.map((quizRef) => {
        quizRef.get().then((quizDoc)=>{
          if(quizDoc.exists){
            const commentIds = quizDoc.data().comments;
            // 퀴즈에 해당하는 댓글 삭제(comments 배열의 모든 아이디)
            deleteComments(commentIds)
          }
  
          // 해당 퀴즈 삭제
          quizRef.delete().then((quizDoc)=>{
            console.log("quiz"+quizDoc.id+" 삭제");
          }).catch(function(error) {
            console.error("Error removing document: ", error);
          });;
        });
      });
    }
  }

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

  const onEditClick = () => {
    if (editingGame) {
      dbService
        .collection("game")
        .doc(gameId)
        .update({
          title: title,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
    setEditingGame(!editingGame);
  };

  const onResultClick = () => {
    history.push(`/results/${gameId}`);
  };

  const onAddQuizClick = () => {
    setIsAddQuiz(true);
  };

  const onSubmit = async (event) => {
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

    await dbService
      .collection("quiz")
      .add(quizObj)
      .then(async(docRef) => {
        // 게임에 퀴즈 ref 추가
        await dbService.collection("game").doc(gameId).update({
          quizzes: firebaseInstance.firestore.FieldValue.arrayUnion(docRef),
        });

      });

    initAddQuizForm()
  };

  const initAddQuizForm = () => {
    setIsAddQuiz(false);
    setQuizTitle("");
    setQuizL("");
    setQuizR("");
  }

  return (
    <div>
      <h1>게임 상세보기</h1>
      <h5>#{gameId}</h5>
      {isLoading ? (
        <>
          <div>
            {editingGame ? (
              <>
                <input name="gameTitle" onChange={onChange} value={title} />
              </>
            ) : (
              <h2>{title}</h2>
            )}
            <button onClick={onEditClick}>
              {editingGame ? "완료" : "제목 편집"}
            </button>
          </div>
          <br/>
          <div>
            <button onClick={onDeleteClick}>게임 삭제</button>
            <button onClick={onResultClick}>결과 보기</button>
            <button onClick={onAddQuizClick}>퀴즈 추가</button>
          </div>
          {isAddQuiz && (
            <form
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
          )}
          <div>
            <p>퀴즈 목록</p>
            <ul>
              {quizzes.map((quiz) => (
                <>
                  <Quiz
                    id={quiz.id}
                    quizRef={quiz.ref}
                    key={quiz.id}
                    title={quiz.title}
                    QuizL={quiz.QuizL}
                    QuizLCount={quiz.QuizLCount}
                    QuizR={quiz.QuizR}
                    QuizRCount={quiz.QuizRCount}
                    gameId={gameId}
                  />
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
