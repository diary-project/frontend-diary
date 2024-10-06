import React from 'react';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserNameForm from './components/UserNameForm';

function D_MY_000() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('USER_TOKEN');
    navigate('/sign-in');
  };

  return (
    <>
      <CommonHeader />
      <MyPageContainer>
        <UserNameForm />
        <UtilityButtons>
          <button onClick={handleLogout}>로그아웃</button>
          <button disabled={true}>회원 탈퇴</button>
        </UtilityButtons>
      </MyPageContainer>
    </>
  );
}

export default D_MY_000;

const MyPageContainer = styled.div`
  width: 100%;
  max-width: 700px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  form {
    width: 100%;
    max-width: 600px;
    margin-bottom: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;
  }
`;

const UtilityButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;

  button {
    width: 100%;
    padding: 1.2rem;
    font-size: 1rem;
    font-weight: 400;
    border-radius: 4px;
    border: 2px solid black;
    background-color: white;

    &:hover {
      background-color: rgb(228, 228, 228);
    }

    &:disabled {
      color: #a5a5a5;
      border: 2px solid #a5a5a5;
    }

    @media (max-width: 480px) {
      padding: 1rem;
    }
  }
`;
