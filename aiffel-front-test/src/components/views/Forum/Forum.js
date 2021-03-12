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
  border: none;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  margin: 10px;
  background-color: #ffffff;
  font-weight: ${(props) => (props.currentPageColor ? 'bold' : 'normal')};
  color: ${(props) => (props.currentPageColor ? '#00BAAD' : '#828282')};
  outline: none;
`;

function Forum(props) {
  let pageNumberArray = [];
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
        // console.log(response.data);
        setForumData(response.data);
        for (let i = 1; i <= Math.ceil(response.data.length / 5); i++) {
          pageNumberArray.push(i); // 페이지 넘버로 넣을 배열을 초기화 후 포문 순환을 끝난 후
          // setPageNumber를 이용하여 배열을 주입 후 렌더링.
          // console.log(PageNumber);
        }
        setPageNumber(pageNumberArray);
      } else {
        alert('데이터 가져오기 실패');
      }
    });
    await Axios.get(
      `http://localhost:5000/forumData?_page=${CurrentPageNumber}&_limit=5`,
    ).then((response) => {
      if (response.data) {
        setSeparateForumData(response.data);
      } else {
        alert('데이터 가져오기 실패');
      }
    });
  }, []); // 포럼 데이터 가져오기 ( ?_page=2&_limit=5 )

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/forumData?_page=${Number(
        CurrentPageNumber,
      )}&_limit=5`,
    ).then((response) => {
      if (response.data) {
        setSeparateForumData(response.data);
      } else {
        alert('데이터 가져오기 실패');
      }
    });
  }, [CurrentPageNumber]); // 페이징처리 useEffect

  //게시판 페이징처리 : useEffect 함수 에서 didmount단계에서 1페이지에 담을 데이터 5개를 가져 온다.
  // didmount단게에서 forum의 전체 데이터 요청 시 데이터의 length/5 를 반올림 한 만큼의 오름차순 숫자 배열을 생성
  //오름차순 숫자 배열을 각 원소마다 button요소의 텍스트로 삽입 후 각 버튼이 클릭 되었을 때 e.target.innerText 로
  //이벤트가 일어난 객체의 숫자를 추출 후 그 숫자로 forum페이지에 get요청으로 5개의 데이터를 받아 와 렌더링 한다.

  const handlePaging = (e) => {
    if (e.target.innerText === '이전') {
      if (CurrentPageNumber === 1) {
        return;
      } else {
        setCurrentPageNumber(CurrentPageNumber - 1);
        return;
      }
    }
    if (e.target.innerText === '다음') {
      if (CurrentPageNumber === Math.ceil(ForumData.length / 5)) {
        return;
      } else {
        setCurrentPageNumber(CurrentPageNumber + 1);
        return;
      }
    }
    setCurrentPageNumber(Number(e.target.innerText));
  };

  const handleValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const renderForumTable = (data, e) => {
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
    let tempForumDataArray = [];
    let forStartNumber = CurrentPageNumber * 5 - 5;
    if (InputValue === '') {
      alert('검색어가 없습니다.');
      return;
    }
    let data = ForumData.filter((item) => {
      return (
        item.title.indexOf(InputValue) > -1 ||
        item.content.indexOf(InputValue) > -1 ||
        item.tag.name.indexOf(InputValue) > -1
      );
    });
    // currentpage * 5 -5 - > 커런트페이지에 따라 5개씩 끊어서 배열에 담기
    // 1일땐 0~4까지 2일땐 5~9까지 ... 쭉
    for (let i = forStartNumber; i <= forStartNumber + 4; i++) {}
    setSeparateForumData(data);
    pageNumberArray = []; // 검색 요청 시 페이징 숫자로 쓸 배열을 빈 배열로 초기화
    for (let i = 1; i <= Math.ceil(data.length / 5); i++) {
      console.log(i);
      pageNumberArray.push(i);
    }
    setPageNumber(pageNumberArray);
    // 후에 검색 요청 후 검색 결과를 담은 배열의 길이를 5로 나눈 후 반올림 한 만큼
    // 포문을 순회하며 배열에 다시 넣고 setPageNumber 호출
  };

  const tableRefresh = () => {
    Axios.get(
      `http://localhost:5000/forumData?_page=${CurrentPageNumber}&_limit=5`,
    ).then((response) => {
      if (response.data) {
        setSeparateForumData(response.data);
        for (let i = 1; i <= Math.ceil(ForumData.length / 5); i++) {
          pageNumberArray.push(i); // 페이지 넘버로 넣을 배열을 초기화 후 포문 순환을 끝난 후
          // setPageNumber를 이용하여 배열을 주입 후 렌더링.
          // console.log(PageNumber);
        }
        setPageNumber(pageNumberArray);
      } else {
        alert('데이터 가져오기 실패');
      }
    });
    setCurrentPageNumber(1);
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
        {SeparateForumData.length <= 5 && (
          <PageButton onClick={handlePaging}>이전</PageButton>
        )}
        {SeparateForumData.length <= 5 &&
          PageNumber.map((item, index) => {
            return (
              <PageButton
                key={index}
                onClick={handlePaging}
                currentPageColor={item === CurrentPageNumber ? true : false}
              >
                {item}
              </PageButton>
            );
          })}
        {SeparateForumData.length <= 5 && (
          <PageButton onClick={handlePaging}>다음</PageButton>
        )}
      </PageButtonContainer>
      {OpenAddForum && (
        <AddForum openAddForumModal={openAddForumModal} forumData={ForumData} />
      )}
    </div>
  );
}

export default Forum;
