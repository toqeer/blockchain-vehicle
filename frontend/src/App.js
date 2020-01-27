import React from "react";
// import "./assets/css/style.css";
import MainApp from "./routes";
import { Router } from "react-router-dom";
import { history } from './utils/history'
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router history={history}>
      <MainApp />
    </Router>
  );
}

export default App;
