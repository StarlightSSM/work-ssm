import React from 'react';
import SignupForm from '../components/SignupForm';
import MyTabs from "../components/myTabs";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/`);
  }

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
      <SignupForm />
    </div>
  );
};

export default Signup;