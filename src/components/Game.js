import React from "react";
import { Link } from "react-router-dom";

function Game({ id, title }) {
  return (
    <li>
      <p>#{id}</p>
      <p>{title}</p>
      <Link to={`/gameDetail/${id}`}>
        <u>상세보기</u>
      </Link>
    </li>
  );
  ````````;
}

export default Game;
