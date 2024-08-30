import React from 'react';

function Calendar({ calendarArr }) {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <section>
      <article>
        {week.map((el, idx) => (
          <p key={idx}>{el}</p>
        ))}
      </article>
      <article>
        {calendarArr.map((el, idx) => (
          <button key={idx}>{el}</button>
        ))}
      </article>
    </section>
  );
}

export default Calendar;
