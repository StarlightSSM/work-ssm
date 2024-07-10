import {useNavigate} from 'react-router-dom';
import React from 'react';
import MyTabs from '../components/myTabs';
import LeftNav from '../components/leftNav';

import "./Edit.css";

export default function Edit() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const goEdit = () => {
        navigate(`/edit`);
    }

    const goHome = () => {
        navigate(`/`);
    }

    return (
            <div className="myPage">
                <header>
                    <nav className="topNav">
                        <li className="Logo" onClick={goHome}>
                            <img className="imgLogo" src={require('../img/MainLogo.png')} alt="Logo" />
                        </li>
                        <li>
                            <MyTabs />
                        </li>
                    </nav>
                </header>
                <LeftNav />
                <div className="profile">
                    <img className="profile_img" alt=""></img>
                    <button className="imgUpload">사진 업로드</button>
                    <p className="nickname">kiki</p>
                    <p className="challengeCompelete">챌린지 달성: </p><p className="compeletedCount">10개</p>
                    <textarea rows="3.5" cols="80" className="intro">저는 유산소 운동을 좋아하는 kiki 입니다. - 자기소개 -</textarea>
                    <button className="cancel" onClick={goBack}>뒤로 가기</button>
                    <button className="update" onClick={goEdit}>수정 하기</button>
                </div>
            </div>
    )
}
