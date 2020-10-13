import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "../fbase";

function App() {
<<<<<<< HEAD
  const [isAdmin, setIsAdmin] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid
        });
        setIsAdmin(true);
      } else {
        setUserObj(null);
      }
    });
    console.log(isAdmin);
  }, [isAdmin]);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
    });
  };

  const onClick = () => {
    authService.signOut();
    setIsAdmin(false);
  };

  return (
    <>
      <AppRouter
        isAdmin={Boolean(isAdmin)}
        refreshUser={refreshUser}
        userObj={userObj}
      />
=======
  const [init, setInit] = useState(true);
  return (
    <>
      {init ? <AdminRouter isLoggedIn={true} /> : <UserRouter />}
>>>>>>> 8d287472a6747a7cfd139590f907fd9b732614cf
      <footer>&copy; Banana Dev {new Date().getFullYear()}</footer>
      {isAdmin && (
        <button onClick={onClick}>
          <a href="/">Logout</a>
        </button>
      )}
    </>
  );
}

export default App;
