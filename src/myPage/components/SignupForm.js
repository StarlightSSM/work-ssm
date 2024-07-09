import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import '../styles.css';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    height: '',
    weight: '',
    age: '',
    interest: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'email') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailRegex.test(value) ? '' : '올바른 이메일 형식을 입력해주세요.'
      }));
    } else if (name === 'password') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordRegex.test(value) ? '' : '비밀번호는 최소 8자와 영문, 숫자, 특수문자를 포함합니다.'
      }));
    } else if (name === 'confirmPassword') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: value === formData.password ? '' : '비밀번호가 일치하지 않습니다.'
      }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('회원가입 버튼이 클릭되었습니다.'); // 디버깅을 위한 콘솔 로그

    if (Object.values(errors).some(error => error)) {
      console.log('폼 유효성 검사 실패'); // 디버깅을 위한 콘솔 로그
      return;
    }

    try {
      const { name, email, password, gender, height, weight, age, interest } = formData;
      const response = await axios.post('http://localhost:3001/auth/register', {
        name, email, password, gender, height, weight, age, interest
      });
      console.log('회원가입 성공!', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error 회원가입 실패', error);
    }
  };

  const ageOptions = Array.from({ length: 100 }, (_, i) => ({
    value: i + 1,
    label: i + 1
  }));

  const interestOptions = [
    { value: '런닝', label: '런닝' },
    { value: '자전거', label: '자전거' },
    { value: '헬스', label: '헬스' },
    { value: '다이어트', label: '다이어트' }
  ];

  return (
    <div className="container">
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <FormInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <FormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <FormInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <FormInput
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="gender">성별</label>
          <FormSelect
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: '남성', label: '남성' },
              { value: '여성', label: '여성' }
            ]}
            required
          />
        </div>
        <div className="form-group height-weight-group">
          <label htmlFor="height">키(cm)</label>
          <FormInput
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
          <label htmlFor="weight">몸무게(kg)</label>
          <FormInput
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">나이</label>
          <FormSelect
            name="age"
            value={formData.age}
            onChange={handleChange}
            options={ageOptions}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="interest">관심 운동</label>
          <FormSelect
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            options={interestOptions}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupForm;
