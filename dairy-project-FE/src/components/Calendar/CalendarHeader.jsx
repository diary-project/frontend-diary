import React, { useEffect, useState } from 'react';
import prevBtn from '../../assets/images/prev-btn.svg';
import nextBtn from '../../assets/images/next-btn.svg';
import useYearMonth from '../../hooks/useYearMonth';

function CalendarHeader({ dynamicDay, setNow, now }) {
  const [disabled, setDisabled] = useState(false);
  const currentDay = useYearMonth(new Date());
  console.log(dynamicDay);
  console.log(currentDay);

  // 연도가 현재 연도보다 크거나, 현재 년도 기준으로 달이 현재 달보다 크면 true
  useEffect(() => {
    if (
      dynamicDay.year > currentDay.year ||
      (dynamicDay.year === currentDay.year && dynamicDay.month >= currentDay.month)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [dynamicDay, currentDay]);

  const handlePrevMonth = () => {
    setNow((prev) => {
      const prevDate = new Date(prev);
      prevDate.setMonth(prev.getMonth() - 1);
      return prevDate;
    });
  };

  const handleNextMonth = () => {
    setNow((prev) => {
      const nextDate = new Date(prev);
      nextDate.setMonth(prev.getMonth() + 1);
      return nextDate;
    });
  };

  return (
    <section>
      <button onClick={handlePrevMonth}>
        <img src={prevBtn} alt="이전달" />
      </button>
      <div>
        <p>{dynamicDay.year}</p>
        <p>{dynamicDay.month}</p>
        <p>타오름달</p>
      </div>
      <button onClick={handleNextMonth} disabled={disabled}>
        <img src={nextBtn} alt="다음달" />
      </button>
    </section>
  );
}

export default CalendarHeader;
