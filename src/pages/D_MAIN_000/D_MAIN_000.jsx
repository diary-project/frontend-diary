import React, { useEffect, useState } from 'react';
import userIcon from '../../assets/images/user-icon.svg';
import { Link } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import useYearMonth from '../../hooks/useYearMonth';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import useFetchUserData from '../../hooks/useFetchUserData';
import generateCalendar from '../../utils/generateCalendar';
import useLocalStorage from '../../hooks/useLocalStorage';
import styled from 'styled-components';

function D_MAIN_000() {
  // 로컬 스토리지에서 마지막 본 달 정보를 가져옴
  const [lastViewValue, setLastViewValue] = useLocalStorage('LAST_VIEW');

  // 마지막 본 달이 있으면 해당 날짜로, 없으면 현재 날짜로 설정
  const initialDate = lastViewValue ? new Date(lastViewValue.year, lastViewValue.month - 1) : new Date();
  const [now, setNow] = useState(initialDate); // 초기 값으로 설정

  const { userData, isLoading, storedValue } = useFetchUserData();
  const calendarArr = generateCalendar(now);
  const dynamicDay = useYearMonth(now);

  const userName = userData?.nickname;

  // 'now'가 변경될 때마다 로컬 스토리지에 마지막 본 달 저장
  useEffect(() => {
    setLastViewValue({ year: dynamicDay.year, month: dynamicDay.month });
  }, [now]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <MainContainer>
      <MainHeader>
        <h2>{userName}의 일기장</h2>
        <Link to="/my-page">
          <img src={userIcon} alt="User Icon" />
        </Link>
      </MainHeader>

      <CalendarWrapper>
        {/* CalendarHeader에서 setNow를 통해 날짜를 변경 */}
        <CalendarHeader dynamicDay={dynamicDay} setNow={setNow} />
        <Calendar dynamicDay={dynamicDay} calendarArr={calendarArr} now={now} storedValue={storedValue} />
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
  align-items: center;
  gap: 5rem;
`;

const MainHeader = styled.header`
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 30px;
    font-family: 'Yuni_ddingddang';
  }

  img {
    width: 36px;
    object-fit: cover;
  }
`;

const CalendarWrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const Description = styled.p`
  font-family: 'Yuni_ddingddang';
  font-size: 7vw;
`;
