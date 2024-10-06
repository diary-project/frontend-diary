import React, { memo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { fetchUserName } from '../../../apis/apis';
import UserIcon from './UserIcon';

function MainHeader() {
  const [storedValue] = useLocalStorage('USER_TOKEN');

  const { isLoading, data: userName } = useQuery({
    queryKey: ['userName', storedValue],
    queryFn: () => fetchUserName(storedValue.access),
  });

  console.log('메인헤더 렌더링');

  return (
    <Header>
      {isLoading ? <UserNameSkeleton /> : <h2>{userName}의 일기장</h2>}
      <UserIconWrapper>
        <UserIcon />
      </UserIconWrapper>
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  max-width: 700px;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 30px;
    font-family: 'Yuni_ddingddang';
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 24px;
      font-family: 'Yuni_ddingddang';
    }
  }
`;

const pulse = keyframes`
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
`;

const UserIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserNameSkeleton = styled.h2`
  width: 150px;
  height: 34.55px;
  border-radius: 12px;
  background-color: #cecece;
  animation: ${pulse} 0.5s ease-in-out infinite;
`;

export default memo(MainHeader);
