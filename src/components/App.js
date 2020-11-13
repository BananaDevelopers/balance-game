import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AppRouter from "components/Router";
import { authService } from "../fbase";
import GlobalStyle from "GlobalStyles";

const Footer = styled.footer`
  text-align: cetner;
  width: 100%;
`;

const LogoutBtn = styled.button``;

const Logout = styled.a`
  textdecoration: "none";
  color: "black";
`;

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
        });
        setIsAdmin(true);
      } else {
        setUserObj(null);
      }
    });
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
      <GlobalStyle />
      <AppRouter
        isAdmin={Boolean(isAdmin)}
        refreshUser={refreshUser}
        userObj={userObj}
      />

      <Footer>&copy; Banana Dev {new Date().getFullYear()}</Footer>
      {isAdmin && (
        <LogoutBtn onClick={onClick}>
          <Logout href="/">Logout</Logout>
        </LogoutBtn>
      )}
    </>
  );
}

export default App;
