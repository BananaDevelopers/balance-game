import React from "react";

import AdminLayout from "component/templates/admin-layout";
import GameList from "components/admin/game-list/GameList";

const GameListPage = () => {
  return (
    <AdminLayout title="게임 리스트">
      <GameList />
    </AdminLayout>
  );
};

export default GameListPage;
