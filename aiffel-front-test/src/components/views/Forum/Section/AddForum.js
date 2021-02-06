import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function AddForum(props) {
  const [InputValue, setInputValue] = useState({
    titleInput: '',
    TextAreaInput: '',
  });
  const { titleInput, TextAreaInput } = InputValue; // inputvapue 구조분해할당
  const [SubmitTagValue, setSubmitTagValue] = useState('general'); // submit 할 태그의 value state 초기값
  const TagOption = [
    {
      name: 'general',
      value: 'general',
    },
    {
      name: 'tip',
      value: 'tip',
    },
    {
      name: 'bug',
      value: 'bug',
    },
    {
      name: 'learn',
      value: 'learn',
    },
  ]; // 태그 옵션을 담은 배열 -> map 메소드를 이용해서 option태그 렌더링

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    const nextInputValue = {
      ...InputValue,
      [name]: value,
    };
    setInputValue(nextInputValue);
    console.log(InputValue);
  }; // 제목, 본문 input value change method

  const onSubmit = () => {
    Axios.post(`http://localhost:5000/forum`, {
      id: props.forumData[props.forumData.length - 1].id + 1, // 제이슨서버 forum라우트 데이터에서 마지막 데이터의 id를 추출한 값의 +1 한 아이디 값을 post요청으로 데이터 추가
      title: titleInput,
      content: TextAreaInput,
      isLiked: false,
      tag: {
        name: SubmitTagValue,
        color: '#ff1357',
      },
    }).then((response) => {
      console.log('success');
    });
  };

  const onTagChange = (e) => {
    setSubmitTagValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleValueChange}
        name="titleInput"
        value={titleInput}
      />
      <br />
      <textarea
        name="TextAreaInput"
        onChange={handleValueChange}
        value={TextAreaInput}
        cols="30"
        rows="10"
      />
      <select onChang={onTagChange}>
        {TagOption.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.value}
            </option>
          );
        })}
      </select>
      <button type="button" onClick={onSubmit}>
        등록
      </button>
    </div>
  );
}

export default AddForum;
