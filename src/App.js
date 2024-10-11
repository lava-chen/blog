import "./App.css";
import { Router } from "react-router-dom";
import React from "react";
import NavBar from "./components/modules/NavBar.js";
import Home from "./components/pages/Home.js";
import CX from "./components/pages/chuangxun.js";

function App() {
  return (
    <>
      <NavBar />
      <hr />
      <div>
        <Router>
          <Home path="/" />
          <CX path="/chuangxun" />
        </Router>
      </div>
    </>
  );
}

export default App;
