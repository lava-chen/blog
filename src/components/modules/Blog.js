import React from "react";
import "./Blog.module.css";
import Markdown from "react-markdown";
import gfm from "remark-gfm";

const Blog = ({ content }) => {
  return (
    <div className="blog">
      <Markdown remarkPlugins={[gfm]}>{content}</Markdown>{" "}
    </div>
  );
};

export default Blog;
