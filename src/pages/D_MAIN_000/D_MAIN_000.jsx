import React, { useEffect, useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import generateCalendar from '../../utils/generateCalendar';
import useLocalStorage from '../../hooks/useLocalStorage';
import styled from 'styled-components';
import getYearMonth from '../../utils/getYearMonth';
import MainHeader from './components/MainHeader';
import Description from './components/Description';

function D_MAIN_000() {
  const [lastViewValue, setLastViewValue] = useLocalStorage('LAST_VIEW');
  const initialDate = lastViewValue ? new Date(lastViewValue.year, lastViewValue.month - 1) : new Date();
  const [now, setNow] = useState(initialDate);

  const calendarArr = generateCalendar(now);
  const dynamicDay = getYearMonth(now);

  // 'now'가 변경될 때마다 로컬 스토리지에 마지막 본 달 저장
  useEffect(() => {
    setLastViewValue({ year: dynamicDay.year, month: dynamicDay.month });
  }, [now]);

  return (
    <MainContainer>
      <MainHeader />
      <CalendarWrapper>
        <CalendarHeader dynamicDay={dynamicDay} setNow={setNow} />
        <Calendar dynamicDay={dynamicDay} calendarArr={calendarArr} now={now} />
        <Description>날짜를 선택해서 그 날의 기록을 남겨보세요</Description>
      </CalendarWrapper>
    </MainContainer>
  );
}

export default D_MAIN_000;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const CalendarWrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
