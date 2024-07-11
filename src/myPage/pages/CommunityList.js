import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CommunityList.css';
import MyTabs from "../components/myTabs";

const CommunityList = ({ communities }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/`);
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
      <h2>커뮤니티 목록</h2>
      <ul className="community-list">
        {communities.map(community => (
          <li key={community.id}>
            <Link to={`/community/${community.id}`}>{community.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;