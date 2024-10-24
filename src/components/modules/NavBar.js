import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const GOOGLE_CLIENT_ID =
  "1010546547181-dgamupkiiui7cerl28jnrsr9gvntd8go.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout }) => {
  const navItems = [
    { path: "/blog", label: "首页" },
    { path: "/blog/blogs", label: "博客" },
    { path: "/blog/Projects", label: "项目" },
    { path: "/blog/new-blog", label: "新的博客" },
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
        {userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
      </nav>
    </>
  );
};

export default NavBar;
