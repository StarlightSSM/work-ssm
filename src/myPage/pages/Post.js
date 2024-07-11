// src/components/Post.js
import React from 'react';
import Comment from './Comment';
import NewComment from './NewComment';

const Post = ({ post, addComment }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <NewComment postId={post.id} addComment={addComment} />
    </div>
  );
};

export default Post;