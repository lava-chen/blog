import React from "react";
import "./BlogCard.css";
import { Link } from "@reach/router";

const BlogCard = ({ title, summary, date, tags, likes, etitle }) => {
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
          <span className="blog-likes">❤️ {likes}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
