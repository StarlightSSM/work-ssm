import React, { useState } from 'react';
import '../styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(emailRegex.test(value) ? '' : '올바른 이메일 형식을 입력해주세요.');
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError(passwordRegex.test(value) ? '' : '비밀번호는 최소 8자와 영문, 숫자, 특수문자를 포함합니다.');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      return;
    }

    console.log('로그인 성공!', { email, password });
  };

  return (
    <div className="container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;