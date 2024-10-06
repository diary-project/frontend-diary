import React, { useEffect, useState, useCallback } from 'react';
import prevBtn from '../../assets/images/prev-btn.svg';
import nextBtn from '../../assets/images/next-btn.svg';
import useYearMonth from '../../utils/getYearMonth';
import styled from 'styled-components';
import { pureKoreanMonth } from '../../constants/translatedCalendar';

function CalendarHeader({ dynamicDay, setNow }) {
  const [disabled, setDisabled] = useState(false);

  // 현재 날짜는 한번만 계산하여 사용
  const currentDay = useYearMonth(new Date());

  // 연도가 현재 연도보다 크거나, 현재 년도 기준으로 달이 현재 달보다 크면 true
  useEffect(() => {
    setDisabled(
      dynamicDay.year > currentDay.year || (dynamicDay.year === currentDay.year && dynamicDay.month >= currentDay.month)
    );
  }, [dynamicDay, currentDay]);

  // 핸들러 함수를 useCallback으로 최적화
  const handlePrevMonth = useCallback(() => {
    setNow((prev) => {
      const prevDate = new Date(prev);
      prevDate.setMonth(prev.getMonth() - 1);
      return prevDate;
    });
  }, [setNow]);

  const handleNextMonth = useCallback(() => {
    setNow((prev) => {
      const nextDate = new Date(prev);
      nextDate.setMonth(prev.getMonth() + 1);
      return nextDate;
    });
  }, [setNow]);

  return (
    <Header>
      <Button onClick={handlePrevMonth}>
        <img src={prevBtn} alt="이전달" />
      </Button>
      <YearMonthInfo>
        <p>{dynamicDay.year}</p>
        <p>{dynamicDay.month}</p>
        <p>{`${pureKoreanMonth[dynamicDay.month - 1]}`}</p>
      </YearMonthInfo>
      <Button onClick={handleNextMonth} disabled={disabled}>
        <img src={nextBtn} alt="다음달" />
      </Button>
    </Header>
  );
}

export default CalendarHeader;

const Header = styled.section`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
`;

const YearMonthInfo = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;

  p {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 14px;

    &:nth-child(2) {
      font-size: 64px;
      font-weight: 400;
      margin: 0;
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  &:disabled {
    opacity: 0;
    visibility: hidden;
    cursor: default;
  }
`;
