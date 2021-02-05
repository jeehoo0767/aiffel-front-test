import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const LinkedTag = styled.tr`
  cursor: pointer;
`;

function ForumTable(props) {
  const LinkForumDetailPage = () => {
    console.log(props.id);
    props.history.push(`/forum/${props.id}`);
  }; // 해당 내용 클릭 시 props로 전달받은 id를 통하여 라우트 이동
  return (
    <React.Fragment key={props.key}>
      <LinkedTag onClick={LinkForumDetailPage}>
        <td>{props.title}</td>
        <td>{props.content}</td>
        <td>{props.tagName}</td>
        <td>{props.time}</td>
      </LinkedTag>
    </React.Fragment>
  );
}

export default withRouter(ForumTable);
