import React, { useEffect, useState } from 'react';
import MyTabs from '../components/myTabs';
import LeftNav from '../components/leftNav';
import Profile from '../components/profile';
import MyList from '../components/mylist';
import "./MyPage.css";
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null); // Define setUserProfile here

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserProfile(user);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        } else {
            // Handle case where 'user' data is not in localStorage
            navigate('/login');
        }
    }, [navigate]);    

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
            {userProfile && <Profile user_id={userProfile.user_id} />}
            <MyList />
        </div>
    );
}

export default MyPage;
