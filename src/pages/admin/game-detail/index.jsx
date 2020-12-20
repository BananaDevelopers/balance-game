import React from "react";

import AdminLayout from "component/templates/admin-layout";
import GameDetail from "components/admin/game-detail/GameDetail";

const GameDetailPage = () => {
  return (
    <AdminLayout title="게임 상세보기">
      <GameDetail />
    </AdminLayout>
  );
};

export default GameDetailPage;
