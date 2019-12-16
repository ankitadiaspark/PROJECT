import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import newItemForm from "./components/newItemForm";
import "bootstrap/dist/css/bootstrap.css";

const routing = (
  <Router>
    <div>
      <Route path="/cart" component={App} />
      <Route path="/newItem" component={newItemForm} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
// ReactDOM.render(<App/>, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
