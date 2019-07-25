import ReactDOM from "react-dom";
import React from "react";
import Administrator from "./components/Administrator";
import Firebase, { FirebaseContext } from "./components/Firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Administrator />
  </FirebaseContext.Provider>,
  document.querySelector("#root")
);
