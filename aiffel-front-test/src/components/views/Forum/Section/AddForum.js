import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function AddForum(props) {
  const [InputValue, setInputValue] = useState({
    titleInput: '',
    TextAreaInput: '',
  });
  const [SubmitTagValue, setSubmitTagValue] = useState('general');
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
  ];
  const { titleInput, TextAreaInput } = InputValue;

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    const nextInputValue = {
      ...InputValue,
      [name]: value,
    };
    setInputValue(nextInputValue);
    console.log(InputValue);
  };

  useEffect(() => {}, []);

  const onSubmit = () => {
    Axios.post(`http://localhost:5000/forum`, {
      id: props.forumData[props.forumData.length - 1].id + 1,
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
