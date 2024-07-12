import React from "react";
import {useNavigate} from 'react-router-dom';
import "./profile.css";

function Profile() {
    const navigate = useNavigate();

    const goEdit = () => {
        navigate(`/edit`);
    }

    return (
        <div className="profile">
            <img className="profile_img" src="../img/cute.jpg" alt=""></img>
            <p className="nickname">kiki</p>
            <p className="challengeCompelete">챌린지 달성: </p><p className="compeletedCount">10개</p>
            <textarea rows="3.5" cols="80" className="intro" readOnly="true">저는 유산소 운동을 좋아하는 kiki 입니다. - 자기소개 -</textarea>
            <button className="update" onClick={goEdit}>프로필 수정</button>
        </div>
    )
};

export default Profile;