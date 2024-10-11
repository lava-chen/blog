import BlogCard from "../modules/BlogCard.js";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("blogs.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.error("Error fetching the blogs:", error);
      });
  }, []);
  console.log(blogs);
  let blogList = null;
  const hasBlogs = blogs.length !== 0;
  if (hasBlogs) {
    blogList = blogs.map((blogObj) => (
      <BlogCard
        title={blogObj.title}
        summary={blogObj.summary}
        date={blogObj.date}
        tags={blogObj.tags}
        likes={blogObj.likes}
      />
    ));
  } else {
    blogList = <div>No blogs!</div>;
  }

  return (
    <>
      <nav class="navBarMain">{blogList}</nav>
    </>
  );
};
export default Blogs;
