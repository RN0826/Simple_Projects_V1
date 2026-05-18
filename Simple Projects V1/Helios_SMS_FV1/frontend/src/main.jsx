import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/variables.css";
import "./styles/base.css";
import "./styles/login.css";
import "./styles/dashboard.css";
import "./styles/forms.css";
import "./styles/tables.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
