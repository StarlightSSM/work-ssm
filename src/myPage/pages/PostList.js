import React from 'react';
import Post from './forms/Post';
import NewPost from './forms/NewPost';

const PostList = ({ posts, addPost, addComment }) => {
  return (
    <div>
      <NewPost addPost={addPost} />
      {posts.map(post => (
        <Post key={post.id} post={post} addComment={addComment} />
      ))}
    </div>
  );
};

export default PostList;