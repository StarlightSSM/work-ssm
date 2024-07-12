import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from '../components/Comment';
import NewComment from '../components/NewComment';
import './PostDetail.css';
import MyTabs from "../components/myTabs";

const PostDetail = ({ communities, addComment }) => {
  const navigate = useNavigate();

    const goHome = () => {
        navigate(`/`);
    }
    
  const { communityId, postId } = useParams();
  const community = communities.find(c => c.id === parseInt(communityId));
  const post = community?.posts.find(p => p.id === parseInt(postId));

  if (!community || !post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  
  return (
    <div>
      <nav className="topNav">
        <li className="Logo" onClick={goHome}>
          <img className="imgLogo" src={require('../img/MainLogo.png')} alt="Logo" />
        </li>
        <li>
          <MyTabs />
        </li>
      </nav>
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
    </div>
  );
};

export default PostDetail;