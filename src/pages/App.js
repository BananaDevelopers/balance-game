import React from "react";
import styled from "styled-components";

import AppRouter from "pages/Router";
import GlobalStyle from "GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRouter />
      <Footer>&copy; Banana Dev {new Date().getFullYear()}</Footer>
    </>
  );
}

export default App;

const Footer = styled.footer`
  text-align: cetner;
  width: 100%;
`;
