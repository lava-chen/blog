import React, { useEffect, useState, useRef } from "react";
import MarkNav from "../modules/ContentBlock.js";
import SideBar from "../modules/SideBar.js";
import CommentBlock from "../modules/CommentBlock.js";
import { useParams } from "@reach/router";
import "./BlogPage.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Blog from "../modules/Blog.js";

const BlogPage = () => {
  const { etitle } = useParams();
  const [content, setContent] = useState("");
  const blogContentRef = useRef(null);
  useEffect(() => {
    const fetchContent = async () => {
      if (!etitle) return; // 防止无效标题请求

      try {
        const response = await fetch(`/blog/blogs/${etitle}.md`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("获取Markdown文件时出错:", error);
        setContent("加载内容时出现错误，请稍后再试。");
      }
    };

    fetchContent();
  }, [etitle]);

  const renderers = {
    code: ({ inline, className, children }) => {
      const language = className?.replace("language-", "");
      return inline ? (
        <code>{children}</code>
      ) : (
        <SyntaxHighlighter
          style={base16AteliersulphurpoolLight}
          language={language}
        >
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <div className="blogPage">
      <SideBar />
      <Blog content={content} renderers={renderers} ref={blogContentRef} />
      <div className="right-side">
        <MarkNav content={content} scrollContainer={blogContentRef.current} />
        <CommentBlock />
      </div>
    </div>
  );
};

export default BlogPage;
