import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/createGame">게임 추가</Link>
        </li>
        <li>
          <Link to="/gameList">게임 목록</Link>
        </li>
        <li>
          <Link to="/suggestionList">제안 목록</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
