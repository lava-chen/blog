import "./App.css";
import { Router } from "@reach/router";
import React from "react";
import NavBar from "./components/modules/NavBar";
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Blogs from "./components/pages/Blogs";
import BlogPage from "./components/pages/BlogPage";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Home path="/blog" />
        <Blogs path="/blog/blogs" />
        <Projects path="/blog/Projects" />
        <BlogPage path="/blog/blogs/:etitle" />
      </Router>
    </>
  );
}

export default App;
