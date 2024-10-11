import "./App.css";
import { Router } from "@reach/router";
import React from "react";
import NavBar from "./components/modules/NavBar";
import Home from "./components/pages/Home";
import CX from "./components/pages/chuangxun";
import Blogs from "./components/pages/Blogs";

function App() {
  return (
    <>
      <NavBar />
      <hr />
      <div>
        <Router>
          <Home path="/blog" />
          <Blogs path="/blog/blogs" />
          <CX path="/blog/chuangxun" />
        </Router>
      </div>
    </>
  );
}

export default App;
