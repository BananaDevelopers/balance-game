import React, { useState, useRef } from "react";
import { ADD_COMMENT } from "./Gaming";
import { dbService } from "fbase";

const WriteComment = ({ dispatch, quizObj, propleft }) => {
  const [nickname, setNickname] = useState("");
  const [pw, setPW] = useState("");
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    const {
      target: { name },
    } = e;

    switch (name) {
      case "nickname":
        setNickname(value);
        break;
      case "pw":
        setPW(value);
        break;
      case "comment":
        setComment(value);
        break;
      default:
        break;
    }
  };

  const addDB = async (cmtObj) => {
    let cmtDocId;

    await dbService
      .collection("comment")
      .add(cmtObj)
      .then((res) => {
        cmtDocId = res.id;
      });

    await dbService.doc(`quiz/${quizObj.docid}`).update({
      comments: [cmtDocId, ...quizObj.comments],
    });

    dispatch({
      type: ADD_COMMENT,
      cmtObj: cmtDocId,
      qdocid: quizObj.docid,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const cmtObj = {
      description: comment,
      date: Date().toLocaleString(),
      nickname: nickname,
      password: pw,
      like: 0,
      left: propleft,
      reply: [],
    };

    addDB(cmtObj);
    setComment("");
    setNickname("");
    setPW("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <span>nickname</span>
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={onChange}
          />
          <span>password</span>
          <input type="password" name="pw" value={pw} onChange={onChange} />
        </div>
        <input type="text" name="comment" value={comment} onChange={onChange} />
        <input type="submit" value="입력" />
      </form>
    </>
  );
};

export default WriteComment;
