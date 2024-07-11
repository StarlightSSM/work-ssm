import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyTabs from "../components/myTabs";
import './NewPostPage.css';

const NewPostPage = ({ addPost }) => {
  const { communityId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/`);
  }

  const handleSubmit = e => {
    e.preventDefault();
    addPost(communityId, title, content);
    setTitle('');
    setContent('');
    navigate(`/community/${communityId}`);
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
      <div className="new-post-page">
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit} className="new-post-form">
        <input 
          type="text" 
          placeholder="제목" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="내용" 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          required 
        ></textarea>
        <button type="submit">작성</button>
      </form>
    </div>
    </div>
  );
};

export default NewPostPage;