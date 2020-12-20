import React from "react";

import AdminLayout from "component/templates/admin-layout";
import CreateGame from "components/admin/create-game/CreateGame";

const CreateGamePage = () => {
  return (
    <AdminLayout title="게임 추가">
      <CreateGame />
    </AdminLayout>
  );
};

export default CreateGamePage;
