import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Gaming from "pages/client/Gaming";
import GameResult from "pages/client/GameResult";

import GameStart from "pages/client/GameStart";
import Login from "pages/login";
import Admin from "pages/admin";
import CreateGamePage from "./admin/create-game";
import GameListPage from "./admin/game-list";
import SuggestionListPage from "./admin/suggestion-list";
import GameDetailPage from "./admin/game-detail";
import ResultListPage from "./admin/result-list";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={GameStart} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/create-game" component={CreateGamePage} />
        <Route exact path="/admin/game-list" component={GameListPage} />
        <Route
          exact
          path="/admin/suggestion-list"
          component={SuggestionListPage}
        />
        <Route exact path="/admin/game-detail/:id" component={GameDetailPage} />
        <Route exact path="/admin/result-list/:id" component={ResultListPage} />

        <Route exact path="/game" component={Gaming} />
        <Route exact path="/game/result" component={GameResult} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
