import React, { useState } from 'react';
import Axios from 'axios';

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

  //we.want.u@aiffel.com -> 요청 이메일
  //passpassplz -> 요청 패스워드

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    Axios.get('http://localhost:5000/login', { email, password }).then(
      (response) => {
        console.log(response.data.length !== 0);
        if (response.data.length !== 0) {
          localStorage.setItem('username', response.data[0].username); // response.data
          props.history.push('/forum');
        } else {
          alert(' 아이디와 비밀번호를 확인해 주세요');
        }
      },
    );
  };
  //
  return (
    <div>
      <form>
        <input
          type="text"
          name="email"
          onChange={handleValueChange}
          value={email}
        />
        <br />
        <input
          type="password"
          name="password"
          onChange={handleValueChange}
          value={password}
        />
        <br />
        <button type="button" onClick={onSubmit}>
          전송
        </button>
      </form>
    </div>
  );
}

export default Login;
