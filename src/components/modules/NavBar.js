import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => (
  <nav class="navBar">
    <h1 className="sixtyfour-convergence-font">LavaChen's Blog</h1>
    <ul className="noto-sans-sc-font ulFlex">
      <li>
        <Link to="/">首页</Link>
      </li>

      <li>
        <Link to="/chuangxun">创训</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;