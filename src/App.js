import "./App.css";
import { Router } from "@reach/router";
import React from "react";
import NavBar from "./components/modules/NavBar";
import Home from "./components/pages/Home";
import CX from "./components/pages/chuangxun";
import Blogs from "./components/pages/Blogs";
import Blog from "./components/modules/Blog";

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Home path="/blog" />
        <Blogs path="/blog/blogs" />
        <CX path="/blog/chuangxun" />
        <Blog path="/blog/blogs/:etitle" />
      </Router>
    </div>
  );
}

export default App;
