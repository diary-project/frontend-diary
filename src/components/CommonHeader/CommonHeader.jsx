import React from 'react';
import { useNavigate } from 'react-router-dom';
import prevPageBtn from '../../assets/images/prev-page.svg';
import styled from 'styled-components';

function CommonHeader() {
  const navigate = useNavigate();
  return (
    <Header>
      <button onClick={() => navigate('/')}>
        <img src={prevPageBtn} alt="메인페이지로 돌아가기" />
      </button>
    </Header>
  );
}

export default CommonHeader;

const Header = styled.header`
  width: 100%;
  height: 30px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 2rem;
  display: flex;
  align-items: center;
  z-index: 999;

  @media (max-height: 450px) {
    background-color: #ffffff7d;
    backdrop-filter: blur(24px);
  }
`;
