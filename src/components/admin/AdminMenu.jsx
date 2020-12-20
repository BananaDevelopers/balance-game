import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin/create-game">게임 추가</Link>
        </li>
        <li>
          <Link to="/admin/game-list">게임 목록</Link>
        </li>
        <li>
          <Link to="/admin/suggestion-list">제안 목록</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminMenu;
