import React from 'react';
import styled, { keyframes } from 'styled-components';

function DiaryTag({ diaryData, isLoading }) {
  return (
    <>
      {isLoading ? (
        <TagSkeleton />
      ) : (
        <Tag>
          {diaryData?.tags?.map((tag, idx) => {
            return <span key={idx}>{`#${tag}`}</span>;
          })}
        </Tag>
      )}
    </>
  );
}

export default DiaryTag;

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

const Tag = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  margin-bottom: 3rem;

  span {
    font-family: 'Ownglyph_jiwoosonang';
    font-size: 24px;
    font-weight: 600;
    color: #1db571;
  }
`;

const skeletonArray = Array.from({ length: 4 }, () => null);

const TagSkeleton = () => {
  return (
    <Wrapper>
      {skeletonArray.map((_, idx) => (
        <Item key={idx} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  margin-bottom: 3rem;
`;

const Item = styled.span`
  width: 45.78px;
  height: 26.36px;
  border-radius: 6px;
  background-color: #cecece;
  animation: ${pulse} ease-in-out infinite;
`;
