import React from 'react';
import MyTabs from '../components/myTabs';
import LeftNav from '../components/leftNav';
import Profile from '../components/profile';
import MyList from '../components/mylist';
import "./MyPage.css";
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
    const navigate = useNavigate();
    
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
                <Profile />
                <MyList />
            </div>
    )
}
