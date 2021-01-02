import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import GameStartPage from "./client";
import Login from "pages/login";
import AdminPage from "pages/admin";
import CreateGamePage from "./admin/create-game";
import GameListPage from "./admin/game-list";
import SuggestionListPage from "./admin/suggestion-list";
import GameDetailPage from "./admin/game-detail";
import ResultListPage from "./admin/result-list";
import GamePage from "./client/game";
import GameResultPage from "./client/game-result";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={GameStartPage} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/admin/create-game" component={CreateGamePage} />
        <Route exact path="/admin/game-list" component={GameListPage} />
        <Route
          exact
          path="/admin/suggestion-list"
          component={SuggestionListPage}
        />
        <Route exact path="/admin/game-detail/:id" component={GameDetailPage} />
        <Route exact path="/admin/result-list/:id" component={ResultListPage} />

        <Route exact path="/game" component={GamePage} />
        <Route exact path="/game/result" component={GameResultPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
