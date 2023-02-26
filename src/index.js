import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "./index.css";
import App from "./App";
import firebaseConfig from "./firebaseConfig";
import { BrowserRouter as Router } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
