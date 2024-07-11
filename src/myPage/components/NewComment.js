import React, { useState } from 'react';
import './NewComment.css';

const NewComment = ({ communityId, postId, addComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addComment(communityId, postId, text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="new-comment-form">
      <input 
        type="text" 
        placeholder="댓글" 
        value={text} 
        onChange={e => setText(e.target.value)} 
        required 
      />
      <button type="submit">작성</button>
    </form>
  );
};

export default NewComment;