import React, { memo } from 'react';
import styled from 'styled-components';
import { week } from '../../constants/translatedCalendar';

function WeekHeader() {
  console.log('week 헤더 렌더링');
  return (
    <Weeks>
      {week.map((el, idx) => (
        <p key={idx}>{el}</p>
      ))}
    </Weeks>
  );
}

export default memo(WeekHeader);

const Weeks = styled.article`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 3px solid #2a2927;
  border-radius: 17px;
  background-color: #f6f4f1;

  p {
    width: calc(100% / 7);
    height: 100%;
    font-size: clamp(24px, 2vw, 28px);
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #2a2927;

    &:first-child {
      color: #ff2222;
    }
    &:last-child {
      border: none;
    }
  }
`;
