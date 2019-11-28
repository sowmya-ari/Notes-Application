import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Registration";
import Logout from "./Logout";
import Notes from "./Notes";

class Customrouter extends React.Component {
  render() {
    return (
      <div className="routes">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/notes" component={Notes} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    );
  }
}
export default Customrouter;
