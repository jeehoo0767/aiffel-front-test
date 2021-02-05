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
  const [PageNumber, setPageNumber] = useState(1);
  const [ForumData, setForumData] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:5000/forum').then((response) => {
      if (response.data) {
        console.log(response.data);
        setForumData(response.data);
      } else {
        alert('데이터 가져오기 실패');
      }
    });
  }, []); // 포럼 데이터 가져오기 ( ?_page=2&_limit=5 )
  
  const handleValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const renderForumTable = (data) => {
    data = data.filter((item) => {
      return item.title.indexOf(InputValue) > -1;
    });
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

  return (
    <div>
      <input type="text" onChange={handleValueChange} value={InputValue} />
      <table border="1" style={{ borderCollapse: 'collapse' }}>
        <th>제 목</th>
        <th>내 용</th>
        <th>태 그</th>
        <th>시 간</th>
        {ForumData && renderForumTable(ForumData)}
      </table>
      <PageButtonContainer>
        <PageButton>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
      </PageButtonContainer>
    </div>
  );
}

export default Forum;
