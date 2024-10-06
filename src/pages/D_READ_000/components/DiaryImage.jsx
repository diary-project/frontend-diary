import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

function DiaryImage({ diaryData }) {
  const [isImgLoaded, setIsImgLoaded] = useState(true);

  return (
    <>
      {isImgLoaded && (
        <DiaryImageSkeleton>
          <Spinner />
        </DiaryImageSkeleton>
      )}
      <DiaryImageWrapper $isImgLoaded={isImgLoaded}>
        <img src={diaryData?.images} alt="일기 썸네일" onLoad={() => setIsImgLoaded(false)} />
      </DiaryImageWrapper>
    </>
  );
}

export default DiaryImage;

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

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DiaryImageWrapper = styled.div`
  width: 100%;
  height: 172px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  overflow: hidden;
  display: ${({ $isImgLoaded }) => ($isImgLoaded ? 'none' : 'block')};

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const DiaryImageSkeleton = styled.div`
  width: 100%;
  min-height: 172px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  background-color: #cacaca;
  animation: ${pulse} 0.3s infinite;
`;

const Spinner = styled.div`
  position: absolute;
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #d8d8d8;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 0.3s ease-in-out infinite;
`;
