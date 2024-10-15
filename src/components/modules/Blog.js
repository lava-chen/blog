import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css";
import MarkNav from "markdown-navbar";
import { useParams } from "@reach/router";
import "./Blog.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexGrow: 1,
    },
    drawer: {
      flexShrink: 0,
      width: 296,
      zIndex: theme.zIndex.drawer + 1,
      "& svg": {
        fontSize: "1.5rem",
      },
    },
    paper: {
      width: 296,
      overflowY: "hidden",
    },
  })
);

const Blog = () => {
  const classes = useStyles();
  const { etitle } = useParams();
  const [content, setContent] = useState("");

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
      const language = className?.replace("language-", "") || "";
      const value = children;
      return inline ? (
        <code>{value}</code>
      ) : (
        <SyntaxHighlighter style={atomDark} language={language}>
          {value}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <body>
      <main className={classes.main}>
        <div style={{ width: "20%" }}>
          <MarkNav
            className="article"
            source={content}
            headingTopOffset={40}
            ordered={false}
          />
        </div>
        <div style={{ width: "70%", marginLeft: "20px" }}>
          {content ? (
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              className="markdown-body"
              components={renderers}
            >
              {content}
            </Markdown>
          ) : (
            <div>内容加载中...</div>
          )}
        </div>
      </main>
    </body>
  );
};

export default Blog;
