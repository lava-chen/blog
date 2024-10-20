import React from "react";

const CommentBlock = () => {
  return (
    <div className="comment-block">
      <h3>Comments</h3>
      <p>V32 - 63 Comments</p>
      <div className="comment">
        <p>
          <strong>Someone 6.8:</strong> It's good! I love this!
        </p>
      </div>
      <div className="comment">
        <p>
          <strong>GUY2 8.6:</strong> Another comment
        </p>
      </div>
      <textarea placeholder="Post a comment"></textarea>
      <button>Post</button>
    </div>
  );
};

export default CommentBlock;
