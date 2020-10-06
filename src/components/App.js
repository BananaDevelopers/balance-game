import React, { useState } from "react";
import AdminRouter from "components/Admin/AdminRouter";
import UserRouter from "components/Client/UserRouter";

function App() {
  const [init, setInit] = useState(false);
  return (
    <>
      {init ? <AdminRouter /> : <UserRouter />}
      <footer>&copy; Banana Dev {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
