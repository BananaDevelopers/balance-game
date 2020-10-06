import React, { useState } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import GameList from "../routes/GameList";
import CreateGame from "../routes/CreateGame";
import GameDetail from "../routes/GameDetail";
import Results from "../routes/Results";
import EditGame from "../routes/EditGame";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <div>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/createGame">
              <CreateGame />
            </Route>
            <Route exact path="/gameList">
              <GameList />
            </Route>
            <Route exact path="/gameDetail/:id">
              <GameDetail />
            </Route>
            <Route exact path="/editGame/:id">
              <EditGame />
            </Route>
            <Route exact path="/results/:id">
              <Results />
            </Route>
            <Redirect from="*" to="/" />
          </div>
        ) : (
          <>
            <Route exact path="/">
              <p>Auth</p>
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
