import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { client } from '../../axios/client';
import circleIco from '../../assets/images/icons/circleIco.svg';

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Days = styled.article`
  width: 100%;
  height: 4vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 3px solid #2a2927;
  border-radius: 17px;
  background-color: #f6f4f1;

  p {
    width: calc(100% / 7);
    height: 100%;
    font-size: 24px;
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

const Dates = styled.article`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 3px solid #2a2927;
  border-radius: 17px;
  overflow: hidden;
`;

const DateButton = styled.button`
  max-width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5vw;
  color: #1d1d1b;
  border-top: 1px solid #2a2927;
  border-right: 1px solid #2a2927;
  margin: 0;
  background-color: #f6f4f1;
  cursor: pointer;
  position: relative; /* 아이콘을 버튼 안에 배치하기 위해 position 사용 */

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

  ${(props) =>
    props.$isToday &&
    `
      background-color: #e2ded7;
    `}

  ${(props) =>
    props.$isFuture &&
    `
      opacity: 0.6;
      pointer-events: none;
    `}

  ${(props) =>
    props.$isNull &&
    `
      pointer-events: none;
    `}

  ${(props) =>
    props.$isDiary &&
    `
    pointer-events: none;
  `}
`;

const CircleIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
`;

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

const SkeletonUI = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  animation: ${pulse} 1.5s infinite; /* 애니메이션 적용 */
`;

function Calendar({ calendarArr, dynamicDay, storedValue }) {
  const [userData, setUserData] = useState([]); // 초기값을 빈 객체로 설정
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const currentDay = new Date();
  const date = String(currentDay.getDate()).padStart(2, '0');
  const year = currentDay.getFullYear();
  const month = currentDay.getMonth() + 1;
  const matchedMonth = String(dynamicDay.month).padStart(2, '0');
  const matchedYear = dynamicDay.year;

  useEffect(() => {
    setIsLoading(true);
    const formattedDate = `year=${matchedYear}&month=${matchedMonth}`;
    const getDiaryDataForDate = async (formattedDate) => {
      try {
        const response = await client.get(`/diary/?${formattedDate}`, {
          headers: {
            Authorization: `Bearer ${storedValue.access}`,
          },
        });
        console.log(response.data.data.dates);
        setUserData(response.data.data.dates);
        setIsLoading(false);
      } catch (err) {
        return null;
      }
    };

    getDiaryDataForDate(formattedDate);
  }, [dynamicDay, calendarArr]);

  const handleClick = async (event, el) => {
    event.preventDefault();

    if (el === null) return;

    const formattedEl = String(el).padStart(2, '0');
    const formattedDate = `${matchedYear}-${matchedMonth}-${formattedEl}`;
    const diaryDataValid = userData.includes(formattedDate);

    if (el === Number(date) && !diaryDataValid) {
      navigate('/write');
    } else if (!diaryDataValid) {
      console.log('일기 없음');
      return;
    } else if (diaryDataValid) {
      navigate(`/read/${formattedDate}`);
    }
  };

  return (
    <Section>
      <Days>
        {week.map((el, idx) => (
          <p key={idx}>{el}</p>
        ))}
      </Days>
      <Dates>
        {calendarArr.map((el, idx) => {
          const formattedEl = el !== null ? String(el).padStart(2, '0') : null;
          const formattedDate = formattedEl ? `${matchedYear}-${matchedMonth}-${formattedEl}` : null;
          const hasData = formattedDate ? userData.includes(formattedDate) : false;

          return (
            <DateButton
              key={idx}
              onClick={(event) => handleClick(event, el)}
              $isToday={year === matchedYear && month === Number(matchedMonth) && el === Number(date)}
              $isFuture={year === matchedYear && month === Number(matchedMonth) && el > Number(date)}
              $isNull={el === null}
              $isDiary={!hasData}
            >
              {el}
              {/* 로딩 중일 때 스켈레톤 UI 표시 */}
              {isLoading && <SkeletonUI />}
              {/* 로딩이 완료되고 userData에서 해당 데이터가 존재할 때 아이콘 표시 */}
              {!isLoading && hasData && <CircleIcon src={circleIco} />}
            </DateButton>
          );
        })}
      </Dates>
    </Section>
  );
}

export default Calendar;
