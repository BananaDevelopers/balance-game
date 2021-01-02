import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import ReplyComment from "./ReplyComment";
import { LEFT } from "../../quiz-select-page/Quiz";

const Comment = ({ commentId, deleteComment, selection }) => {
  const [comment, setComment] = useState(null);
  const [password, setPassword] = useState("");
  const [replyFlag, setReplyFlag] = useState(false);

  useEffect(() => {
    getComment();
  }, []);

  const getComment = () => {
    dbService.collection("comment").onSnapshot(async () => {
      const comment = await dbService.doc(`comment/${commentId}`).get();
      if (comment.data()) setComment({ ...comment.data() });
    });
  };

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickDelete = () => {
    if (password != comment.password) {
      window.confirm("wrong password");
      setPassword("");
      return;
    }

    const ok = window.confirm("are you sure you want to delete this comment?");
    if (ok) {
      deleteComment(commentId);
    }
    setPassword("");
  };

  const handleClickLike = async () => {
    await dbService.doc(`comment/${commentId}`).update({
      like: comment.like + 1,
    });
    setComment({
      ...comment,
      like: comment.like + 1,
    });
  };

  const handleClickReply = () => {
    setReplyFlag(true);
  };

  return (
    <>
      {comment && (
        <div style={comment.direction === LEFT ? styleLeft : styleRight}>
          <span>{comment.nickname}</span>
          <br />
          <input type="password" onChange={onChange} value={password} />
          <button onClick={handleClickDelete}>Delete</button>
          <br />
          <span>{comment.description}</span>
          <button onClick={handleClickLike}>Like</button>
          <span>{comment.like}</span>
          <button onClick={handleClickReply}>reply</button>
          <br />
          {replyFlag ? (
            <ReplyComment
              commentId={commentId}
              replyIds={comment.reply}
              selection={selection}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default Comment;

//임시 스타일
const styleLeft = {
  color: "red",
};
const styleRight = {
  color: "blue",
};
