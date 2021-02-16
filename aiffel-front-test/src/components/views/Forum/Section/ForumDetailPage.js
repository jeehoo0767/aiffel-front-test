import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import {
  ButtonStyle,
  Modal,
  ModalOverlay,
  ModalContent,
} from '../../../../Styles/Styles';

const TitleDetailContainer = styled.div`
  border-top: 1px solid #333333;
  border-bottom: 1px solid #e0dede;
  font-weight: bold;
  font-size: 20px;
  background-color: #f4f6f7;
  padding: 20px;

  div {
    margin: 10px 0;
  }
`;

const LikeButtonStyle = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  margin: 10px 10px;
  cursor: pointer;
  outline: none;
`;

function ForumDetailPage(props) {
  const [DetailForumData, setDetailForumData] = useState();
  const [IsLiked, setIsLiked] = useState(false);
  const [IsModal, setIsModal] = useState(false);
  let forumId = props.match.params.id; // 상세페이지 포럼 id
  useEffect(() => {
    Axios.get(`http://localhost:5000/forumData/${forumId}`).then((response) => {
      if (response.data) {
        console.log(response.data);
        setIsLiked(response.data.isLiked);
        setDetailForumData(response.data);
      } else {
        alert('가져오기 실패');
      }
    });
  }, []); // didmount에서 상데페이지 해당 포럼 데이터의 id를 통한 디테일포럼데이터 셋팅
  const likeHandler = () => {
    Axios.patch(
      `/forumData/${forumId}`,
      IsLiked ? { isLiked: false } : { isLiked: true },
    ).then((response) => {
      if (IsLiked) {
        console.log(response.data);
        setIsLiked(false);
      } else {
        setIsLiked(true);
      }
    });
  };
  const openModal = () => {
    setIsModal(!IsModal);
  };

  const deleteForum = () => {
    Axios.delete(`/forumData/${forumId}`).then((response) => {
      alert('삭제에 성공 하였습니다.');
      props.history.push('/forum');
    });
  };
  return (
    <div>
      {DetailForumData && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '90%' }}>
            <TitleDetailContainer>
              <div>{DetailForumData.title}</div>
              <div style={{ color: '#9B9B9B', fontWeight: 'normal' }}>
                {DetailForumData.tag.name}
              </div>
            </TitleDetailContainer>
            <div
              style={{
                padding: '30px',
                fontWeight: '500',
                fontSize: '18px',
                lineHeight: '2rem',
              }}
            >
              {DetailForumData.content}
            </div>
          </div>
        </div>
      )}
      <div
        style={{ width: '90%', display: 'flex', justifyContent: 'flex-end' }}
      >
        <LikeButtonStyle
          style={{ background: IsLiked ? '#00baad' : '#b5b6b7' }}
          onClick={likeHandler}
        >
          좋아요
        </LikeButtonStyle>
        <ButtonStyle onClick={openModal} style={{ backgroundColor: '#b5b6b7' }}>
          삭제
        </ButtonStyle>
      </div>
      <Modal style={{ display: IsModal ? 'block' : 'none' }}>
        <ModalOverlay onClick={openModal}></ModalOverlay>
        <ModalContent>
          <h1>정말 삭제 하시겠습니까?</h1>
          <ButtonStyle
            onClick={deleteForum}
            style={{ backgroundColor: '#b5b6b7' }}
          >
            삭제
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

export default withRouter(ForumDetailPage);
