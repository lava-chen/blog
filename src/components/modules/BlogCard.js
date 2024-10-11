import React from "react";
import "./BlogCard.css";

const BlogCard = ({ props }) => {
  return (
    <div class="blog-card">
      <h3 class="blog-title">{props.title}</h3>
      <p class="blog-summary">{props.summary}</p>
      <div class="blog-meta">
        <span class="blog-date">{props.date} </span>
        <span class="blog-tags"> {props.tags}</span>
        <span class="blog-likes">❤️ {props.likes}</span>
      </div>
    </div>
  );
};
export default BlogCard;
