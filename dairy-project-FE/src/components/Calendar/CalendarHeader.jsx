import React from 'react';
import prevBtn from '../../assets/images/prev-btn.svg';
import nextBtn from '../../assets/images/next-btn.svg';

function CalendarHeader({ currentDay }) {
  return (
    <section>
      <button>
        <img src={prevBtn} alt="이전달" />
      </button>
      <div>
        <p>{currentDay.year}</p>
        <p>{currentDay.month}</p>
        <p>타오름달</p>
      </div>
      <button>
        <img src={nextBtn} alt="다음달" />
      </button>
    </section>
  );
}

export default CalendarHeader;
