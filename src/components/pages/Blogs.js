import BlogCard from "../modules/BlogCard.js";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("/blog/blogs.json")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
      })
      .catch((error) => {
        console.error("Error fetching the blogs:", error);
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
    <body>
      <nav className="navBarMain">{blogList}</nav>
    </body>
  );
};
export default Blogs;
