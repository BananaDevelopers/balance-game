import React, { useState } from "react";

import { LEFT } from "../../quiz-select-page/Quiz";

const WriteComment = ({ selection, addComment, hasReply = true }) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    switch (name) {
      case "nickname":
        setNickname(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "comment":
        setComment(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const _comment = {
      description: comment,
      date: Date().toLocaleString(),
      nickname: nickname,
      password: password,
      like: 0,
      direction: selection, //left (왼:0, 오: 1) -> 값 변경 direction (왼: -1, 오: 1)
      ...(hasReply ? { reply: [] } : {}), // reply x
    };
    addComment(_comment);

    setComment("");
    setNickname("");
    setPassword("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div style={comment.direction === LEFT ? styleLeft : styleRight}>
          <span>nickname</span>
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={onChange}
          />
          <span>password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input type="text" name="comment" value={comment} onChange={onChange} />
        <input type="submit" value="입력" />
      </form>
    </>
  );
};

export default WriteComment;

//임시 스타일
const styleLeft = {
  color: "red",
};
const styleRight = {
  color: "blue",
};
