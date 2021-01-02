import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

import WriteComment from "./WriteComment";

import { LEFT } from "../../quiz-select-page/Quiz";

const ReplyComment = ({ commentId, replyIds, selection }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    getReply();
  }, []);

  const getReply = async () => {
    replyIds.map(async (rid) => {
      const reply = await dbService.doc(`replyComment/${rid}`).get();
      setReplies((prevReplies) => [
        { id: rid, ...reply.data() },
        ...prevReplies,
      ]);
    });
  };

  const addReply = async (reply) => {
    var replyId;
    await dbService
      .collection("replyComment")
      .add(reply)
      .then((res) => {
        replyId = res.id;
        setReplies((prev) => [{ id: replyId, ...reply }, ...prev]); //update ui
      });

    // update comment replyIds
    const prev = await dbService.doc(`comment/${commentId}`).get();
    await dbService.doc(`comment/${commentId}`).update({
      reply: [replyId, ...prev.data().reply],
    });
  };

  return (
    <>
      <WriteComment
        selection={selection}
        addComment={addReply}
        hasReply={false}
      />

      {replies.map((reply) => (
        <div
          key={reply.id}
          style={reply.direction === LEFT ? styleLeft : styleRight}
        >
          {console.log("reply", reply)}
          {reply.nickname} &gt; {reply.description}
        </div>
      ))}
    </>
  );
};

export default ReplyComment;

//임시 스타일
const styleLeft = {
  color: "red",
};
const styleRight = {
  color: "blue",
};
