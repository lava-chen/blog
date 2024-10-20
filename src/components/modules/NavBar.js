import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
  const navItems = [
    { path: "/blog", label: "首页" },
    { path: "/blog/blogs", label: "博客" },
    { path: "/blog/Projects", label: "项目" },
  ];

  return (
    <>
      <nav className="navBar ">
        <h1 className="sixtyfour-convergence-font">
          <Link to="/blog">LavaChen's Blog</Link>
        </h1>
        <ul className="noto-sans-sc-font ulFlex ">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
