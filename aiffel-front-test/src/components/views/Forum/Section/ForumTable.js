import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const LinkedTag = styled.tr`
  cursor: pointer;
`;

const ContentTd = styled.td`
  display: block;
  width: 500px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 0px solid black;
`;

function ForumTable(props) {
  const LinkForumDetailPage = () => {
    props.history.push(`/forum/${props.id}`);
  }; // 해당 내용 클릭 시 props로 전달받은 id를 통하여 라우트 이동
  return (
    <React.Fragment key={props.key}>
      <LinkedTag onClick={LinkForumDetailPage}>
        <td style={{ width: '150px' }}>{props.title}</td>
        <ContentTd>{props.content}</ContentTd>
        <td>{props.tagName}</td>
        <td>{props.time}</td>
      </LinkedTag>
    </React.Fragment>
  );
}

export default withRouter(ForumTable);
