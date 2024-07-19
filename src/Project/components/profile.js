import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./profile.css";

const Profile = ({ user_id }) => {
    const [profile, setProfile] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState('');

    const handleImageClick = () => {
        if (profile.profile_picture) {
            setModalImageSrc(profile.profile_picture);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImageSrc('');
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/profile/${user_id}`);
                const userData = response.data;
    
                if (userData) {
                    setProfile(response.data);
                } else {
                    console.error('Received undefined data from API');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
    
        fetchUserProfile();
    }, [user_id]);

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:3001/profile/${user_id}`);
    //             setProfile(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch profile:', error);
    //         }
    //     };
    //     fetchProfile();
    // }, [user_id]);

    return (
        <div className="profile-container">
            <div className="profile">
                <div className="img-preview" onClick={handleImageClick}>
                    {profile.profile_picture && (
                        <img id="img-prev" src={profile.profile_picture} alt="Profile" />
                    )}
                </div>
                <div className="profile-details">
                    <p className="nickname" name="nickname">{profile.nickname || '닉네임 없음'}</p>
                    <p className="challengeComplete">챌린지 달성: <span className="completedCount">{profile.achievement_count || 0} 개</span></p>
                    <textarea
                        rows="3"
                        cols="30"
                        className="intro"
                        name="intro"
                        readOnly
                        value={profile.intro || '자기소개 없음'}
                    />
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
}

export default Profile;
