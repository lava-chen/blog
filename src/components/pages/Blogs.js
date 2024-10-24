import BlogCard from "../modules/BlogCard.js";
import "./Blogs.css";
import React, { useEffect, useState } from "react";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/blogs")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
      });
  }, []);
  console.log(blogs);
  let blogList = null;

  if (blogs.length > 0) {
    blogList = blogs.map((blogObj, index) => {
      if (blogObj && blogObj.title) {
        return (
          <BlogCard
            key={index}
            title={blogObj.title}
            summary={blogObj.summary || "No summary available"}
            date={blogObj.date || "Unknown date"}
            tags={blogObj.tags || []}
            likes={blogObj.likes || 0}
            etitle={blogObj.etitle}
          />
        );
      } else {
        console.warn("Blog object is missing properties:", blogObj);
        return null;
      }
    });
  } else {
    blogList = <div>No blogs!</div>;
  }

  return (
    <div className="blogspage-container">
      <nav className="navBarMain">{blogList}</nav>
    </div>
  );
};
export default Blogs;
