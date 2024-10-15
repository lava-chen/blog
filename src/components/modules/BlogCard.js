import React, { useState, useEffect } from "react";
import "./BlogCard.css";
import { Link } from "@reach/router";

const BlogCard = ({
  title,
  summary,
  date,
  tags,
  likes: initialLikes,
  etitle,
}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  useEffect(() => {
    // 检查用户是否已点赞
    const liked = localStorage.getItem(`liked-${etitle}`);
    if (liked) {
      setHasLiked(true);
    }
  }, [etitle]);

  const handleLike = async () => {
    if (!hasLiked) {
      setLikes(likes + 1); // 增加点赞数
      setHasLiked(true);
      localStorage.setItem(`liked-${etitle}`, "true"); // 记录已点赞
      try {
        const response = await fetch(`/blog/blog.json/${title}/likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likes: likes + 1,
          }),
        });
      } catch (error) {
        alert("请求失败: " + error.message);
      }
    } else {
      alert("您已经点赞过了！");
    }
  };
  return (
    <Link to={`/blog/blogs/${etitle}`}>
      <div className="blog-card">
        <Link to={`/blog/blogs/${etitle}`} className="blog-title">
          {title}
        </Link>
        <p className="blog-summary">{summary}</p>
        <div className="blog-meta">
          <span className="blog-date">{date}</span>
          <span className="blog-tags">{tags}</span>
          <span className="blog-likes" onClick={handleLike}>
            ❤️ {likes}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
