import React, { useState } from 'react';
import icon from '../../../assets/images/user-icon.svg';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

function UserIcon() {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <>
      {isImageLoading && <UserIconSkeleton />}
      <Link to="/my-page">
        <UserIconImage
          src={icon}
          alt="유저아이콘"
          $isImageLoading={isImageLoading}
          onLoad={() => setIsImageLoading(false)}
        />
      </Link>
    </>
  );
}

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

const UserIconSkeleton = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #cecece;
  animation: ${pulse} 0.5s ease-in-out infinite;
`;

const UserIconImage = styled.img`
  width: 36px;
  object-fit: cover;

  ${({ $isImageLoading }) => ($isImageLoading ? 'display: none;' : 'display: block;')}
`;

export default UserIcon;
