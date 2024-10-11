import React from "react";
import "./BlogCard.css";

const BlogCard = ({ title, date, author, excerpt, image, slug }) => {
  return (
    <div class="blog-card">
      <h3 class="blog-title">博客文章标题</h3>
      <p class="blog-summary">
        这是文章的大概内容，简要介绍了文章的主题和要点。
      </p>
      <div class="blog-meta">
        <span class="blog-date">2024-10-11 </span>
        <span class="blog-tags"> #标签1 #标签2</span>
        <span class="blog-likes">❤️ 42</span>
      </div>
    </div>
  );
};
export default BlogCard;
