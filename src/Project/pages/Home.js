//챌린지랑 운동기록페이지로 이동하는 임시 페이지
import React from "react";
import { useNavigate } from "react-router-dom";
import MyTabs from "../components/myTabs";
import "./Home.css";

function Home(){
    const navigate = useNavigate();

    const goHome = () => {
        navigate(`/`);
    }

    return(
        <div>
            <nav className="topNav">
                <li className="Logo" onClick={goHome}>
                    <img className="imgLogo" src={require('../img/MainLogo.png')} alt="Logo" />
                </li>
                <li>
                    <MyTabs />
                </li>
            </nav>
            <div className="title">메인 페이지 입니다.</div>
        </div>

    )
}
export default Home;