import Blog from "../modules/Blog.js";
import BlogCard from "../modules/BlogCard.js";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("articles/test.md")
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) =>
        console.error("Error fetching the markdown file:", error)
      );
  }, []);

  return (
    <>
      <nav class="navBarMain">
        <h1 className="h1Large title-font">Blogs</h1>
        <Blog content={content} />
        <BlogCard />
      </nav>
    </>
  );
};
export default Blogs;
