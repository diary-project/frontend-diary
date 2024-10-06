import React, { useState } from 'react';
import { weatherIco } from '../../../assets/images/weatherIcons/weatherIco';
import styled, { keyframes } from 'styled-components';

function Date({ formattedDay, diaryData }) {
  const icoSrc = weatherIco?.find((ico) => ico?.id === diaryData?.weather)?.hover;

  return (
    <DateContainer>
      <DateTitle>{formattedDay}</DateTitle>
      <WeatherIcon ico={icoSrc} />
    </DateContainer>
  );
}

export default Date;

const WeatherIcon = ({ ico, diaryData }) => {
  const [isImgLoading, setIsImgLoading] = useState(true);
  return (
    <>
      {isImgLoading && <IconSkeleton />}
      <Icon src={ico} alt={diaryData?.weather} onLoad={() => setIsImgLoading(false)} $isImgLoading={isImgLoading} />
    </>
  );
};

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

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 2rem;
`;

const DateTitle = styled.h2`
  font-weight: 400;
  text-align: center;
  margin-right: 12px;
`;

const Icon = styled.img`
  position: absolute;
  top: -2px;
  left: 220px;
  display: ${({ isImgLoading }) => (isImgLoading ? 'none' : 'block')};
`;

const IconSkeleton = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  top: -2px;
  left: 220px;
  background-color: #cecece;
  animation: ${pulse} 0.5s ease-in-out infinite;
`;
