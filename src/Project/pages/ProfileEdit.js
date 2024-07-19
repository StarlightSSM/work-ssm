import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MyTabs from '../components/myTabs';
import LeftNav from '../components/leftNav';
import "./ProfileEdit.css";

const Edit = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nickname: '',
        intro: '',
        profile_picture: null,
        profile_picture_url: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/profiles?user_id=${userId}`)
          .then(response => setPosts(response.data))
          .catch(error => console.error(error));
    }, [userId]);

    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const goHome = () => {
        navigate('/');
    };

    const findProfile = profiles.find(profile => profile.user_id === parseInt(userId));

    if (!findProfile) {
        return console.log("프로필을 찾을 수 없습니다.");
    }

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

            const response = await axios.put(`http://localhost:5000/profile/update/${user_id}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('프로필 업데이트 성공!', response.data);
            navigate(`/profile/${user_id}`);
        } catch (error) {
            console.error('프로필 업데이트 실패!', error);
        }

        navigate(`/myPage`);
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
                        <textarea rows="6" cols="85" name="intro" className="edit-intro" value={formData.intro} onChange={(e) => setFormData({ ...formData, intro: e.target.value })} />
                        <button className="edit-cancel" onClick={goBack}>뒤로 가기</button>
                        <button id="edit-btn" className="edit-update" type="submit">프로필 수정</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
