import React from 'react';
import './Comment.css';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;