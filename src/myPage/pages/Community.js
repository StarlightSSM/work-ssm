import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MyTabs from "../components/myTabs";
import './Community.css';

const Community = ({ communities }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/`);
  }

  const { communityId } = useParams();
  const community = communities.find(c => c.id === parseInt(communityId));

  if (!community) {
    return <div>커뮤니티를 찾을 수 없습니다.</div>;
  }

  const handleNewPost = () => {
    navigate(`/community/${community.id}/new-post`);
  };

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
      <div className="community">
      <h2>{community.name}</h2>
      <ul className="posts-list">
        {community.posts.map(post => (
          <li key={post.id}>
            <Link to={`/community/${community.id}/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <button className="new-post-button" onClick={handleNewPost}>글쓰기</button>
    </div>
    </div>
  );
};

export default Community;