import React, { useEffect, useState } from "react";
import "./Blog.module.css";
import Markdown from "react-markdown";
import gfm from "remark-gfm";

const Blog = () => {
  const [content, setContent] = useState("");
  const filepath = "/path/to/your/markdown/file.md"; // 请根据实际情况修改路径

  useEffect(() => {
    fetch(filepath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => setContent(text))
      .catch((error) => {
        console.error("获取Markdown文件时出错:", error);
        setContent("加载内容时出现错误，请稍后再试。");
      });
  }, [filepath]); // 如果需要根据 filepath 变化重新请求，可以将其加入依赖

  return (
    <div className="blog">
      <Markdown remarkPlugins={[gfm]}>{content}</Markdown>
    </div>
  );
};

export default Blog;
