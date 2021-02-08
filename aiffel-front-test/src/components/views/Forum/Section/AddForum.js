import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  InputStyle,
  ButtonStyle,
  TextAreaStyle,
  SelectBoxStyle,
  Modal,
  ModalOverlay,
  ModalContent,
} from '../../../../Styles/Styles';

function AddForum(props) {
  const [InputValue, setInputValue] = useState({
    titleInput: '',
    TextAreaInput: '',
  });
  const [IsModal, setIsModal] = useState(true);
  const [SubmitTagValue, setSubmitTagValue] = useState('general'); // submit 할 태그의 value state 초기값
  const { titleInput, TextAreaInput } = InputValue; // inputvalue 구조분해할당
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
    Axios.post(`http://localhost:5000/forumData`, {
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
    openModal();
  };
  const openModal = () => {
    setIsModal(!IsModal);
    props.openAddForumModal();
    // 부모 컴포넌트인 Forum의 state가 현재 자식 컴포넌트의
    //상태가 변경됨에 따라 부모에게도 상태를 전달하기 위한
  };
  const onTagChange = (e) => {
    setSubmitTagValue(e.target.value);
  };

  return (
    <div>
      <Modal style={{ display: IsModal ? 'block' : 'none' }}>
        <ModalOverlay onClick={openModal}></ModalOverlay>
        <ModalContent>
          <h3 style={{ color: 'white' }}>포럼 등록</h3>
          <InputStyle
            type="text"
            onChange={handleValueChange}
            name="titleInput"
            value={titleInput}
          />
          <br />
          <TextAreaStyle
            name="TextAreaInput"
            onChange={handleValueChange}
            value={TextAreaInput}
          />
          <br />
          <SelectBoxStyle onChange={onTagChange}>
            {TagOption.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.value}
                </option>
              );
            })}
          </SelectBoxStyle>
          <br />
          <ButtonStyle
            type="button"
            style={{ backgroundColor: '#b5b6b7' }}
            onClick={onSubmit}
          >
            등록
          </ButtonStyle>
          <ButtonStyle
            onClick={openModal}
            style={{ backgroundColor: '#b5b6b7' }}
          >
            닫기
          </ButtonStyle>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddForum;
