import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import ForumTable from './Section/ForumTable';

const PageButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  height: 34px;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
`;

function Forum() {
  const [InputValue, setInputValue] = useState('');
  const [PageNumber, setPageNumber] = useState([1, 2, 3]);
  const [ForumData, setForumData] = useState([]); // 검색용 포럼 데이터
  const [SeparateForumData, setSeparateForumData] = useState([]); // 페이징 렌더링용 포럼 데이터
  const [CurrentPageNumber, setCurrentPageNumber] = useState(1);
  useEffect(() => {
    Axios.get(`http://localhost:5000/forum`).then((response) => {
      if (response.data) {
        console.log(response.data);
        setForumData(response.data);
      } else {
        alert('데이터 가져오기 실패');
      }
    });
    Axios.get(
      `http://localhost:5000/forum?_page=${CurrentPageNumber}&_limit=5`,
    ).then((response) => {
      if (response.data) {
        console.log(response.data);
        setSeparateForumData(response.data);
      } else {
        alert('데이터 가져오기 실패');
      }
    });
  }, []); // 포럼 데이터 가져오기 ( ?_page=2&_limit=5 )

  const handlePaging = (e) => {
    Axios.get(
      `http://localhost:5000/forum?_page=${Number(
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
          key={index}
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
    let data = ForumData.filter((item) => {
      return item.title.indexOf(InputValue) > -1;
    });
    console.log(data);
    setSeparateForumData(data);
  };

  const tableRefresh = () => {
    Axios.get(
      `http://localhost:5000/forum?_page=${CurrentPageNumber}&_limit=5`,
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

  return (
    <div>
      <input type="text" onChange={handleValueChange} value={InputValue} />
      <button type="button" onClick={filterForumTable}>
        검색
      </button>
      <button type="button" onClick={tableRefresh}>
        초기화
      </button>
      <table border="1" style={{ borderCollapse: 'collapse' }}>
        <th>제 목</th>
        <th>내 용</th>
        <th>태 그</th>
        <th>시 간</th>
        {SeparateForumData && renderForumTable(SeparateForumData)}
      </table>
      <PageButtonContainer>
        {SeparateForumData.length === 5 &&
          PageNumber.map((item, index) => {
            return (
              <PageButton key={index} onClick={handlePaging}>
                {item}
              </PageButton>
            );
          })}
      </PageButtonContainer>
    </div>
  );
}

export default Forum;
