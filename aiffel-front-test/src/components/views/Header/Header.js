import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
const HeaderContainer = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  position: sticky;
  background-color: #fff;
  top: 0;
  z-index: 124;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e7edef;
`;
function Header(props) {
  return (
    <HeaderContainer>
      <img
        style={{ width: '150px', height: '50px', marginLeft: '100px' }}
        src="aiffel_logo.png"
        alt="플랫폼로고"
      />
      <img
        onClick={() => props.history.push('/profile')}
        style={{
          width: '100px',
          height: '50px',
          marginRight: '100px',
          cursor: 'pointer',
        }}
        src="profile.png"
        alt="플랫폼로고"
      />
    </HeaderContainer>
  );
}

export default withRouter(Header);
