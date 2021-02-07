import React, { useState, useEffect } from 'react';
import Axios from 'axios';
function ForumDetailPage(props) {
  const [DetailForumData, setDetailForumData] = useState();
  let forumId = props.match.params.id; // 상세페이지 포럼 id
  useEffect(() => {
    Axios.get(`http://localhost:5000/forum/${forumId}`).then((response) => {
      if (response.data) {
        console.log(response.data);
        setDetailForumData(response.data);
      } else {
        alert('가져오기 실패');
      }
    });
  }, []); // didmount에서 상데페이지 해당 포럼 데이터의 id를 통한 디테일포럼데이터 셋팅

  return (
    <div>
      {DetailForumData && (
        <div>
          <h3>{DetailForumData.title}</h3>
          <h4>{DetailForumData.tag.name}</h4>
          <h4>{DetailForumData.content}</h4>
        </div>
      )}
    </div>
  );
}

export default ForumDetailPage;
