import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import ForumTable from './Section/ForumTable';
import AddForum from './Section/AddForum';
import { StyledTable, ButtonStyle, InputStyle } from '../../../Styles/Styles';

const PageButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  height: 34px;
  color: white;
  border: none;
  background: #00baad;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  margin: 10px;
`;

function Forum(props) {
  const [InputValue, setInputValue] = useState('');
  const [PageNumber, setPageNumber] = useState([]);
  const [ForumData, setForumData] = useState([]); // 검색용 포럼 데이터
  const [SeparateForumData, setSeparateForumData] = useState([]); // 페이징 렌더링용 포럼 데이터
  const [CurrentPageNumber, setCurrentPageNumber] = useState(1);
  const [OpenAddForum, setOpenAddForum] = useState(false);
  useEffect(async () => {
    props.childSettingHeader(); // app.js(부모컴포넌트) 의 상태를 변경시키기 위해 전달받은 메소드를 didmount단계에서 실행
    await Axios.get(`http://localhost:5000/forumData`).then((response) => {
      if (response.data) {
        console.log(response.data);
        setForumData(response.data);
        for (let i = 1; i <= Math.ceil(response.data.length / 5); i++) {
          PageNumber.push(i); // 스테이트의 직접 수정은 좋지 않은 방법임. 다른 방법을 찾는중.
          console.log(PageNumber);
        }
      } else {
        alert('데이터 가져오기 실패');
      }
    });
    await Axios.get(
      `http://localhost:5000/forumData?_page=${CurrentPageNumber}&_limit=5`,
    ).then((response) => {
      if (response.data) {
        console.log(response.data);
        setSeparateForumData(response.data);
      } else {
        alert('데이터 가져오기 실패');
      }
    });
  }, []); // 포럼 데이터 가져오기 ( ?_page=2&_limit=5 )

  //게시판 페이징처리 : useEffect 함수 에서 didmount단계에서 1페이지에 담을 데이터 5개를 가져 온다.
  // didmount단게에서 forum의 전체 데이터 요청 시 데이터의 length/5 를 반올림 한 만큼의 오름차순 숫자 배열을 생성
  //오름차순 숫자 배열을 각 원소마다 button요소의 텍스트로 삽입 후 각 버튼이 클릭 되었을 때 e.target.innerText 로
  //이벤트가 일어난 객체의 숫자를 추출 후 그 숫자로 forum페이지에 get요청으로 5개의 데이터를 받아 와 렌더링 한다.

  const handlePaging = (e) => {
    Axios.get(
      `http://localhost:5000/forumData?_page=${Number(
        e.target.innerText,
      )}&_limit=5`,
    ).then((response) => {
      if (response.data) {
        setSeparateForumData(response.data);
      } else {
        alert('데이터 가져오기 실패');
      }
    });
  };

  const handleValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const renderForumTable = (data) => {
    return data.map((item, index) => {
      return (
        <ForumTable
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          tagColor={item.tag.color}
          tagName={item.tag.name}
          time={item.id}
        />
      );
    });
  };

  const filterForumTable = () => {
    if (InputValue === '') {
      alert('검색어가 없습니다.');
      return;
    }
    let data = ForumData.filter((item) => {
      return item.title.indexOf(InputValue) > -1;
    });
    console.log(data);
    setSeparateForumData(data);
  };

  const tableRefresh = () => {
    Axios.get(
      `http://localhost:5000/forumData?_page=${CurrentPageNumber}&_limit=5`,
    ).then((response) => {
      if (response.data) {
        console.log(response.data);
        setSeparateForumData(response.data);
      } else {
        alert('데이터 가져오기 실패');
      }
    });
    setInputValue('');
  };

  const openAddForumModal = () => {
    setOpenAddForum(!OpenAddForum);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 0',
        }}
      >
        <InputStyle
          style={{ marginLeft: '20px' }}
          type="text"
          onChange={handleValueChange}
          value={InputValue}
        />
        <ButtonStyle type="button" onClick={filterForumTable}>
          검색
        </ButtonStyle>
        <ButtonStyle type="button" onClick={openAddForumModal}>
          추가
        </ButtonStyle>
        <ButtonStyle type="button" onClick={tableRefresh}>
          초기화
        </ButtonStyle>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', height: '300px' }}
      >
        <StyledTable
          style={{
            textAlign: 'center',
          }}
        >
          <thead>
            <th>제 목</th>
            <th>내 용</th>
            <th>태 그</th>
            <th>시 간</th>
          </thead>
          <tbody>
            {SeparateForumData && renderForumTable(SeparateForumData)}
          </tbody>
        </StyledTable>
      </div>
      <PageButtonContainer>
        {SeparateForumData.length <= 5 &&
          PageNumber.map((item, index) => {
            return (
              <PageButton key={index} onClick={handlePaging}>
                {item}
              </PageButton>
            );
          })}
      </PageButtonContainer>
      {OpenAddForum ? (
        <AddForum openAddForumModal={openAddForumModal} forumData={ForumData} />
      ) : (
        ''
      )}
    </div>
  );
}

export default Forum;
