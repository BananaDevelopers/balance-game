import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { DEL_COMMENT } from "../../routes/Client/Gaming";
import ReplyComment from "./ReplyComment";

//임시 스타일
const styleLeft = {
  //left0
  color: "red"
};
const styleRight = {
  //left1
  color: "blue"
};
const styleNone = {
  //left2
  color: "black"
};
//임시

const Comment = ({ cmtObj, quizObj, dispatch }) => {
  const [delFlag, setDelFlag] = useState(false);
  const [replyFlag, setReplyFlag] = useState(false);
  const [pwtext, setPWtext] = useState("");

  const [nickname, setNickname] = useState("");
  const [pw, setPW] = useState("");
  const [description, setDescription] = useState("");
  const [like, setLike] = useState();
  const [left, setLeft] = useState();

  useEffect(
    () => {
      console.log(1, cmtObj);
      setComment();
    },
    [cmtObj]
  );

  const delDB = async () => {
    console.log(cmtObj);

    const dbcmt = await dbService.doc(`comment/${cmtObj}`).get();
    const dbreply = dbcmt.data().reply;
    console.log(dbreply);

    dbreply.map(async r => {
      await dbService.doc(`replyComment/${r}`).delete();
    });

    await dbService.doc(`comment/${cmtObj}`).delete();
    await dbService.doc(`quiz/${quizObj.docid}`).update({
      comments: quizObj.comments.filter(c => c != cmtObj)
    });
  };
  const delClick = () => {
    // const com = await dbService.doc(`comment/${cmtObj.docid}`).get()
    // .then(res=>console.log(res))
    setDelFlag(true);
    if (pwtext != pw) {
      const error = window.confirm("wrong password");
      setPWtext("");
      return;
    }

    const ok = window.confirm("are you sure you want to delete this comment?");
    if (ok) {
      delDB();
      dispatch({ type: DEL_COMMENT, cmtObj: cmtObj, quizDoc: quizObj.docid });
    }
    setPWtext("");
  };

  const onChange = e => {
    const { target: { value } } = e;

    setPWtext(value);
  };
  const likeClick = async () => {
    await dbService.doc(`comment/${cmtObj}`).update({
      like: like + 1
    });
    setLike(prev => prev + 1);
  };

  const setComment = async () => {
    const cmt = await dbService.doc(`comment/${cmtObj}`).get();
    //console.log(cmt);
    setNickname(cmt.data().nickname);
    setPW(cmt.data().password);
    setDescription(cmt.data().description);
    setLike(cmt.data().like);
    setLeft(cmt.data().left);
  };

  const replyClick = () => {
    setReplyFlag(true);
  };

  return (
    <div style={left === 0 ? styleLeft : styleRight}>
      <span>{nickname}</span>
      <input type="password" onChange={onChange} value={pwtext} />
      <button onClick={delClick}>Delete</button>
      <span>{left}</span>
      <br />
      <span>{description}</span>
      <button onClick={likeClick}>Like</button>
      <span>{like}</span>
      <button onClick={replyClick}>reply</button>
      <br />
      {replyFlag ? <ReplyComment cmtObj={cmtObj} /> : <div />}
    </div>
  );
};

export default Comment;
