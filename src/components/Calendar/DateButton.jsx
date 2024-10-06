import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import circleIco from '../../assets/images/circleIco.svg';

function DateButton({ date, onClick, hasData, isToday, isFuture, isDiary, isLoading }) {
  return (
    <StyledDateButton
      onClick={(event) => onClick(event, date)}
      $isToday={isToday}
      $isFuture={isFuture}
      $isDiary={isDiary}
      $isNull={date === null}
    >
      {date}
      {isLoading && <SkeletonUI />}
      {hasData && <CircleIcon src={circleIco} />}
    </StyledDateButton>
  );
}

export default DateButton;

const CircleIcon = () => {
  const [isImgLoading, setIsImgLoading] = useState(true);

  return (
    <>
      {isImgLoading && <Spinner />}
      <Icon src={circleIco} onLoad={() => setIsImgLoading(false)} $isImgLoading={isImgLoading} />
    </>
  );
};

const StyledDateButton = styled.button`
  max-width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(16px, 7vw, 36px);
  color: #1d1d1b;
  border-top: 1px solid #2a2927;
  border-right: 1px solid #2a2927;
  margin: 0;
  background-color: #f6f4f1;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #d8d5d2;
  }

  &:nth-child(-n + 7) {
    border-top: none;
  }

  &:nth-child(7n) {
    border-right: none;
  }

  &:nth-child(7n + 1) {
    color: #ff2222;
  }

  ${(props) => props.$isToday && `background-color: #e2ded7;`}
  ${(props) => props.$isFuture && `opacity: 0.6; pointer-events: none;`}
  ${(props) => props.$isNull && `pointer-events: none;`}
  ${(props) => props.$isDiary && `pointer-events: none;`}
`;

const pulse = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Icon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  opacity: ${(props) => (props.$isImgLoading ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

const SkeletonUI = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  animation: ${pulse} 0.5s ease-in-out infinite;
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
