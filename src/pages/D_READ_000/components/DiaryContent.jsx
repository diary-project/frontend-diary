import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

function DiaryContent({ diaryData, isLoading }) {
  return <>{isLoading ? <ContentSkeleton /> : <Content wrap="soft">{diaryData?.content}</Content>}</>;
}

export default DiaryContent;

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

const Content = styled.div`
  width: 100%;
  height: 223px;
  margin-bottom: 2rem;
  overflow-y: auto;

  font-family: 'Ownglyph_jiwoosonang';
  font-size: 30px;
  font-weight: 400;
  overflow-wrap: break-word;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 12px;
  padding-bottom: 4px;
  line-height: 2;
  border: none;
  background-color: transparent;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: #c7c4b929;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c7c4b9;
    height: 112px;
    border-radius: 2px;
  }
`;

const skeletonArray = Array.from({ length: 5 }, () => null);

const ContentSkeleton = () => {
  return (
    <>
      <Wrapper>
        {skeletonArray.map((_, idx) => {
          let width = 7 - idx;
          return <ContentArea key={idx} $width={width} />;
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 223px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 6px;
  background-color: #cecece;
  animation: ${pulse} 0.5s ease-in-out infinite;
`;

const ContentArea = styled.div`
  width: ${({ $width }) => `${$width}0%`};
  height: 14px;
  border-radius: 4px;
  background-color: #bbbbbb;
  animation: ${pulse} 0.5s ease-in-out infinite;
`;
