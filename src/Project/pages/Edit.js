import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyTabs from '../components/myTabs';
import LeftNav from '../components/leftNav';
import "./Edit.css";  // 파일 이름을 소문자로 수정

const Edit = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nickname: '',
    intro: '',
    profile_picture: null, // This will hold the file object
    profile_picture_url: '' // This will hold the URL after successful upload
  });

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profile_picture: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('nickname', formData.nickname);
      form.append('intro', formData.intro);
      form.append('profile_picture', formData.profile_picture);
  
      const response = await axios.post('http://localhost:3001/update', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { url } = response.data;
  
      // Update formData or handle the URL as needed
      console.log('프로필 업데이트 성공!', response.data);
      navigate('/myPage');
    } catch (error) {
      console.error('프로필 업데이트 실패!', error);
    }
  };

  return (
    <div className="edit-myPage">
      <header>
        <nav className="edit-topNav">
          <li className="edit-Logo" onClick={goHome}>
            <img className="edit-imgLogo" src={require('../img/MainLogo.png')} alt="Logo" />
          </li>
          <li>
            <MyTabs />
          </li>
        </nav>
      </header>
      <LeftNav />
      <div className="edit-profile">
        <form id="edit-form" onSubmit={handleSubmit}>
          <div className="edit-img-preview">
            {formData.profile_picture_url && (
              <img id="img-prev" name="profile_picture" src={formData.profile_picture_url} width="250" alt="미리 보기" />
            )}
          </div>
          <div>
            <label htmlFor="img" className='uploadImg'>+ 사진 업로드</label>
            <input id="img" name="profile_picture" type="file" onChange={handleFileChange} />
            <label htmlFor="nick" className='nick'>* 새로운 닉네임</label>
            <input className="edit-nickname" id="nickname" name="nickname" type='text' value={formData.nickname} onChange={(e) => setFormData({ ...formData, nickname: e.target.value })} />
            <textarea rows="6" cols="85" name="intro" className="edit-intro" value={formData.intro} onChange={(e) => setFormData({ ...formData, intro: e.target.value })}>저는 유산소 운동을 좋아하는 kiki 입니다. - 자기소개 -</textarea>
            <button className="edit-cancel" onClick={goBack}>뒤로 가기</button>
            <button id="edit-btn" className="edit-update" type="submit">프로필 수정</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
