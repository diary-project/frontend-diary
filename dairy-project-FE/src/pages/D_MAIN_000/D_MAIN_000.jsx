import React, { useEffect, useState } from 'react';
import style from './D_MAIN_000.module.scss';
import userIcon from '../../assets/images/user-icon.svg';
import { Link } from 'react-router-dom';
import useCalendar from '../../hooks/useCalendar';
import Calendar from '../../components/Calendar/Calendar';
import useYearMonth from '../../hooks/useYearMonth';
import CalendarHeader from '../../components/Calendar/CalendarHeader';

function D_MAIN_000() {
  const [now, setNow] = useState(new Date());
  const [isLogin, setIsLogin] = useState(false);
  const calendarArr = useCalendar(now);
  const dynamicDay = useYearMonth(now);
  const userName = '김진모';

  return (
    <div className={style.container}>
      <header>
        <h2>{userName}의 일기장</h2>
        <Link to="/my-page">
          <img src={userIcon} />
        </Link>
      </header>

      <main>
        <CalendarHeader dynamicDay={dynamicDay} setNow={setNow} />
        <Calendar calendarArr={calendarArr} />
        <p className={style.description}>날짜를 선택해서 그 날의 기록을 남겨보세요</p>
      </main>
    </div>
  );
}

export default D_MAIN_000;
