import React, { useEffect, useState } from "react";
import "./Blog.css";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { useParams } from "@reach/router";

const Blog = () => {
  const { etitle } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
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

    if (etitle) {
      fetchContent();
    }
  }, [etitle]);

  return (
    <nav className="blog-navBarMain">
      <div className="blog">
        <Markdown remarkPlugins={[gfm]}>{content}</Markdown>
      </div>
    </nav>
  );
};

export default Blog;
