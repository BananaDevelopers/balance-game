import React, { useState } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "routes/Admin/Home";
import GameList from "routes/Admin/GameList";
import CreateGame from "routes/Admin/CreateGame";
import GameDetail from "routes/Admin/GameDetail";
import Results from "routes/Admin/Results";
import EditGame from "routes/Admin/EditGame";
import Navigation from "./Navigation";

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
