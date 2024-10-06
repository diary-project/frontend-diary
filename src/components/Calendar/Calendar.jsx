import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useLocalStorage from '../../hooks/useLocalStorage';
import WeekHeader from './WeekHeader';
import { useQuery } from '@tanstack/react-query';
import { fetchAllDiaryData } from '../../apis/apis';
import { getCurrentDateInfo } from '../../utils/getCurrentDateInfo';
import DateButton from './DateButton';

const Calendar = ({ calendarArr, dynamicDay }) => {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage('USER_TOKEN');
  const { currentDate, currentYear, currentMonth, targetMonth, targetYear, formattedQuery } =
    getCurrentDateInfo(dynamicDay);

  const {
    isLoading,
    data: userData,
    refetch,
  } = useQuery({
    queryKey: ['allDiaries', formattedQuery],
    queryFn: () => fetchAllDiaryData(formattedQuery, storedValue.access),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleClick = (event, date) => {
    event.preventDefault();
    if (date === null) return;

    const formattedEl = String(date).padStart(2, '0');
    const formattedDate = `${targetYear}-${targetMonth}-${formattedEl}`;
    const hasData = userData?.includes(formattedDate);

    if (hasData) {
      // 만약 클릭된 일수에 해당하는 데이터가있다면 => 해당 날짜의 read 페이지로 이동
      navigate(`/read/${formattedDate}`);
    } else if (date === Number(currentDate) && Number(currentMonth) === Number(targetMonth)) {
      // 만약 클릭된 일수가 오늘 날짜이지만 일기 데이터가 없다면 => write 페이지로 이동
      navigate(`write/${formattedDate}`);
    } else {
      // 만약 클릭된 일수에 해당하는 데이터가 없고, 오늘 날짜도 아니면,
      console.log('일기 없음');
    }
  };

  return (
    <Section>
      <WeekHeader />
      <Dates>
        {calendarArr.map((arrNum, idx) => {
          const formattedEl = arrNum !== null ? String(arrNum).padStart(2, '0') : null;
          const formattedDate = formattedEl ? `${targetYear}-${targetMonth}-${formattedEl}` : null;
          const hasData = formattedDate ? userData?.includes(formattedDate) : false;

          const isToday =
            currentYear === targetYear &&
            Number(currentMonth) === Number(targetMonth) &&
            arrNum === Number(currentDate);

          const isFuture =
            currentYear === targetYear && Number(currentMonth) === Number(targetMonth) && arrNum > Number(currentDate);

          const isDiary = !isToday && !hasData;

          return (
            <DateButton
              key={idx}
              date={arrNum}
              onClick={handleClick}
              hasData={hasData}
              isToday={isToday}
              isFuture={isFuture}
              isDiary={isDiary}
              isLoading={isLoading}
            />
          );
        })}
      </Dates>
    </Section>
  );
};

const Section = styled.section`
  width: 100%;
  height: auto;
  min-width: 300px;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Dates = styled.article`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 3px solid #2a2927;
  border-radius: 17px;
  overflow: hidden;
`;

export default Calendar;
