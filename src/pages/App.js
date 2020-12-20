import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import AppRouter from "pages/Router";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing:border-box;
    }
    a{
        color:inherit;
        text-decoration:none;
    }
    body{
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding:0 35%;
    }
`;

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
