import React from "react";
import "./Home.css";
import { Link } from "@reach/router";

const Home = () => {
  return (
    <div className="home-body">
      <nav className="navBarHome">
        <h1 className="h1Large title-font">Hi there !</h1>
        <Link to="/blog/blogs">
          <h2 className="title-font">Enter Blog</h2>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
