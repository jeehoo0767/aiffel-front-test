import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import ForumTable from './Section/ForumTable';
import AddForum from './Section/AddForum';

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
    // Axios.post(`http://localhost:5000/forum`, {
    //   id: 16,
    //   title: '질문이 있습니다 16 ',
    //   content:
    //     '불어 밝은 위하여 커다란 사라지지 새 가진 같은 가는 것이다. 못하다 무엇을 용기가 그들은 이것이다. 동산에는 있으며, 바로 이것을 것은 길지 인생을 청춘 그들을 끓는다. 피고, 위하여 피에 품었기 속잎나고, 무한한 사랑의 말이다. 눈에 못하다 투명하되 우리 인간의 간에 미묘한 영원히 아름다우냐? 장식하는 광야에서 보내는 얼음 고행을 긴지라 이것이다. 사랑의 더운지라 있음으로써 위하여, 놀이 쓸쓸하랴? 주며, 황금시대를 현저하게 있음으로써 꽃 봄바람이다. 청춘의 피가 없는 것은 말이다.',
    //   isLiked: false,
    //   tag: {
    //     name: 'bug',
    //     color: '#ff1357',
    //   },
    // }).then((response) => {
    //   console.log('success');
    // });

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
      <AddForum forumData={ForumData} />
    </div>
  );
}

export default Forum;
