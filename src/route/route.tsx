import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import BoilingVerdict from "../components/BoilingVerdict";
import NewsDashboard from "../components/NewsDashboard";
import AppMenu from "../components/AppMenu/AppMenu";
import StudentManage from "../components/StudentManage";
import { Typography } from "antd";
import Todo from "../components/Todo";

const RouteConfig = () => {
  return (
    <Router>
      <Route path="/">
        <AppMenu>
          <Switch>
            <Route exact path="/">
              <Typography.Title style={{ textAlign: "center" }}>
                Welcome to React.
              </Typography.Title>
            </Route>
            <Route path="/board" component={NewsDashboard} />
            <Route path="/boil" component={BoilingVerdict} />
            <Route path="/student" component={StudentManage} />
            <Route path="/todo">
              <Todo />
            </Route>
          </Switch>
        </AppMenu>
      </Route>
    </Router>
  );
};

export default RouteConfig;
