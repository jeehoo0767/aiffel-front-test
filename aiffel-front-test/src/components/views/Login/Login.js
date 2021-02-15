import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { ButtonStyle, InputStyle } from '../../../Styles/Styles';

function Login(props) {
  const [InputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const { email, password } = InputValue;
  const handleValueChange = (e) => {
    const { name, value } = e.target;
    const nextInputValue = {
      ...InputValue,
      [name]: value,
    };
    setInputValue(nextInputValue);
    console.log(InputValue);
  };
  useEffect(() => {
    if (localStorage.getItem('username')) {
      props.history.push('/forum');
    }
  }, []);
  //we.want.u@aiffel.com -> 요청 이메일
  //passpassplz -> 요청 패스워드

  const emailCheck = (email) => {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(email) ? true : false;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    if (emailCheck(email) && password.length >= 10) {
      Axios.get('http://localhost:5000/login', { email, password }).then(
        (response) => {
          console.log(response.data);
          if (response.data.length !== 0) {
            sessionStorage.setItem(
              'username',
              Math.random().toString(36).substr(2, 11),
            ); // response.data
            props.history.push('/forum');
          } else {
            alert('아이디와 비밀번호를 확인해 주세요');
          }
        },
      );
    } else if (password.length < 10) {
      alert('비밀번호는 10자리 이상이여야 합니다.');
    } else {
      alert('아이디는 이메일 형식이여야 합니다.');
      return;
    }
  };
  //
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <img src="aiffel_logo.png" style={{ marginBottom: '40px' }} alt="로고" />
      <br />
      <InputStyle
        type="text"
        name="email"
        placeholder="아이디"
        onChange={handleValueChange}
        value={email}
      />
      <br />
      <InputStyle
        type="password"
        name="password"
        placeholder="비밀번호"
        onChange={handleValueChange}
        value={password}
      />
      <br />
      <ButtonStyle type="button" onClick={onSubmit}>
        로그인
      </ButtonStyle>
    </div>
    // <div class="input_top_text">이름</div>
    // <input type="text" class="form_Input">
    // <div class="name_error error hide">Username can't be blank
    // </div>
    // <div class="input_top_text">이메일</div>
    // <input type="text" class="form_Input">
    // <div class="email_error error hide">Email can't be blank</div>
    // <div class="input_top_text">비밀번호</div>
    // <input type="text" class="form_Input">
    // <div class="password_error error hide">Password can't be blank</div>
    // <div class="form_button_area">
    //     <button type="submit" class="form_button">Sign Up</button>
    // </div>
  );
}

export default Login;
