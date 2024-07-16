import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./profile.css";

function Profile() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState('');

    const goEdit = () => {
        navigate(`/edit`);
    };

    const handleImageClick = () => {
        const imgSrc = document.getElementById('img-prev').src;
        if (imgSrc) {
            setModalImageSrc(imgSrc);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImageSrc('');
    };

    return (
        <div className="profile-container">
            <div className="profile">
                <div className="img-preview" onClick={handleImageClick}>
                    <img id="img-prev" src="https://avatars.githubusercontent.com/u/135091?v=4" hidden="true" alt=" " />
                    <input id="img-url" type="hidden" name="profile_picture" />
                </div>
                <div className="profile-details">
                    <p className="nickname" name="nickname">kiki</p>
                    <p className="challengeComplete">챌린지 달성: <span className="completedCount">10개</span></p>
                    <textarea rows="3" cols="30" className="intro" name="intro" readOnly>저는 유산소 운동을 좋아하는 kiki 입니다. - 자기소개 -</textarea>
                    <button id="edit-btn" className="update" onClick={goEdit}>프로필 수정</button>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={modalImageSrc} alt="원본 보기" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;