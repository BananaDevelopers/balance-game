import React, { useState } from "react";
import AppRouter from "./Router";

function App() {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState(true);

  return (
    <>
      <header>
        <h1>관리자 모드</h1>
      </header>
      {init ? <AppRouter isLoggedIn={user} /> : "Initializing..."}
      <footer>&copy; Banana Dev {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
