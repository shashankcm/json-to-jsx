/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import NotFoundPage from "../containers/NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

class App extends React.Component {
  render() {
    const activeStyle = { color: "blue" };
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
