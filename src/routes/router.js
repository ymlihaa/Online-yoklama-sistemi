import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

export default () => {
  <BrowserRouter>
    <Switch>
      <Route path="/" component={() => <Login />} />
      
    </Switch>
  </BrowserRouter>;
};
