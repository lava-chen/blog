import "./App.css";
import { Router } from "@reach/router";
import React, { useState, useEffect } from "react";
import NavBar from "./components/modules/NavBar";
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Blogs from "./components/pages/Blogs";
import BlogPage from "./components/pages/BlogPage";
import NewBlog from "./components/pages/NewBlog";

import { get, post } from "./utilities";

function App() {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    get("http://localhost:3001/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);
  const handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);

    const userToken = res.tokenObj.id_token;
    post("http://localhost:3001/api/login", { token: userToken }).then(
      (user) => {
        // the server knows we're logged in now
        setUserId(user._id);
        console.log(user);
      }
    );
  };
  const handleLogout = () => {
    console.log("Logged out successfully!");
    post("http://localhost:3001/api/logout");
    setUserId(null);
  };
  return (
    <>
      <NavBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
      />

      <Router>
        <Home path="/blog" />
        <Blogs path="/blog/blogs" />
        <Projects path="/blog/Projects" />
        <NewBlog path="/blog/new-blog" />
        <BlogPage path="/blog/blogs/:etitle" />
      </Router>
    </>
  );
}

export default App;
