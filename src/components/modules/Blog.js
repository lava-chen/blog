import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "../pages/BlogPage.css";
import "./Blog.css";

const Blog = ({ content, renderers }) => {
  return (
    <div className="blog-content">
      {content ? (
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={renderers}
          className="markdown-body"
        >
          {content}
        </Markdown>
      ) : (
        <div>内容加载中...</div>
      )}
    </div>
  );
};

export default Blog;
