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
        const response = await fetch("http://localhost:3001/api/blogs");
        const data = await response.json(); // 解析为JSON格式

        // 假设data是一个数组，并且每个对象都有etitle和blogcontent属性
        const blogPost = data.find((post) => post.etitle === etitle);

        if (blogPost) {
          setContent(blogPost.blogcontent); // 设置对应的blogcontent
        } else {
          setContent("未找到对应的内容。");
        }
      } catch (error) {
        console.error("获取Markdown文件时出错:", error);
        setContent("加载内容时出现错误，请稍后再试。");
      }
    };

    fetchContent();
  }, [etitle]); // 添加依赖项，etitle改变时重新执行

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
