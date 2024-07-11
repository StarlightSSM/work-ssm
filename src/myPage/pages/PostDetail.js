import React from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import NewComment from '../components/NewComment';
import './PostDetail.css';

const PostDetail = ({ communities, addComment }) => {
  const { communityId, postId } = useParams();
  const community = communities.find(c => c.id === parseInt(communityId));
  const post = community?.posts.find(p => p.id === parseInt(postId));

  if (!community || !post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <h3>댓글</h3>
      <ul className="comments-list">
        {post.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
      <NewComment communityId={community.id} postId={post.id} addComment={addComment} />
    </div>
  );
};

export default PostDetail;