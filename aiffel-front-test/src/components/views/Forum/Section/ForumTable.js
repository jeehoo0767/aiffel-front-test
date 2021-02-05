import React from 'react';

function ForumTable(props) {
  return (
    <React.Fragment key={props.key}>
      <tr>
        <td>{props.title}</td>
        <td>{props.content}</td>
        <td>{props.tagName}</td>
        <td>{props.time}</td>
      </tr>
    </React.Fragment>
  );
}

export default ForumTable;
