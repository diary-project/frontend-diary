import React from 'react';
import KakaoLoginBtn from './KakaoLoginBtn/KakaoLoginBtn';
import loginBorder from '../../assets/images/kakao-btn-border.png';
import { BASE_URL } from '../../constants/keys';
import styled, { keyframes } from 'styled-components';

function D_SIGNIN_000() {
  const handleKakaoLogin = () => {
    // 카카오 동의 페이지
    location.href = `${BASE_URL}/oauth/login`;
  };

  return (
    <>
      <SignInContainer>
        <Title>그땐 그랬지</Title>
        <SignInButton onClick={handleKakaoLogin}>
          <span>카카오로 시작</span>
          <KakaoLoginBtn />
        </SignInButton>
      </SignInContainer>
    </>
  );
}

export default D_SIGNIN_000;

const displaySignInPage = keyframes`
    0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${displaySignInPage} 0.8s ease-in-out forwards;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
`;

const SignInButton = styled.button`
  width: 335px;
  height: 67px;
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  background-image: url(${loginBorder});
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }

  span {
    font-family: 'Pretendard-Regular';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`;
