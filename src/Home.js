import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Result from "./components/Result";
import EditTable from "./components/editTable";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function Home() {
  return (
    <Router>
      <div className="main-container-block">
        <Header />

        <div className="container">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/result" component={Result} />
            <Route path="/edit" component={EditTable} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Home;
