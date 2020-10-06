import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Gaming from "routes/Client/Gaming";
import GameStart from "routes/Client/GameStart";
import SuggestionPage from "routes/Client/SuggestionPage";

const UserRouter = () => {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/">
            <GameStart />
          </Route>
          <Route exact path="/game">
            <Gaming />
          </Route>
          <Route exact path="/game/result">
            <SuggestionPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
};

export default UserRouter;
