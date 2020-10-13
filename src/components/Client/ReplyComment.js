import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const ReplyComment = ({ cmtObj }) => {
  const [nickname, setNickname] = useState("");
  const [pw, setPW] = useState("");
  const [comment, setComment] = useState("");

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    setReply();
  }, []);

  const setReply = async () => {
    const tmp = await dbService.doc(`comment/${cmtObj}`).get();
    const replydocs = tmp.data().reply;

    replydocs.map(async r => {
      const retmp = await dbService.doc(`replyComment/${r}`).get();
      //console.log(retmp.data());
      setReplies(prev => [retmp.data(), ...prev]);
    });

    console.log(replydocs);
  };

  const onChange = e => {
    const { target: { value } } = e;
    const { target: { name } } = e;

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
    }
  };

  const addDB = async reObj => {
    let cmtDocId;

    await dbService
      .collection("replyComment")
      .add(reObj)
      .then(res => {
        cmtDocId = res.id;
        console.log(cmtDocId);
      });

    const prev = await dbService.doc(`comment/${cmtObj}`).get();
    console.log(prev.data());

    await dbService.doc(`comment/${cmtObj}`).update({
      reply: [cmtDocId, ...prev.data().reply]
    });

    // dispatch({
    //   type: ADD_COMMENT,
    //   cmtObj: cmtDocId,
    //   qdocid: quizObj.docid
    // });
  };

  //db replaycomment에 추가,
  //db comment안에 reply에 위에 추가한 doc id 추가
  const replyClick = () => {
    const reObj = {
      description: comment,
      date: Date().toLocaleString(),
      nickname: nickname,
      password: pw,
      like: 0
    };

    addDB(reObj);
    setComment("");
    setNickname("");
    setPW("");
    setReplies(prev => [reObj, ...prev]);
  };

  return (
    <>
      {replies.map(r => (
        <div>
          {r.nickname} >> {r.description}
        </div>
      ))}
      nickname{" "}
      <input type="text" name="nickname" onChange={onChange} value={nickname} />
      password{" "}
      <input type="password" name="pw" onChange={onChange} value={pw} />
      <br />
      <input type="text" name="comment" onChange={onChange} value={comment} />
      <button onClick={replyClick}>입력</button>
    </>
  );
};

export default ReplyComment;
