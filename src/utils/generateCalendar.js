function generateCalendar(currDate) {
  const year = currDate.getFullYear(); // 2024
  const month = currDate.getMonth(); // 7

  // 공백 열 포함 캘린더 생성 함수
  const firstDay = new Date(year, month, 1); // 현재 연도의 월의 첫 번째 날
  const lastDay = new Date(year, month + 1, 0); // 현재 연도의 월의 마지막 날
  const weekStart = firstDay.getDay(); // 올해의 현재 달의 첫날 요일 | 24년 8월 1일 => 목요일(4)
  const weekLast = lastDay.getDay(); // 올해의 현재 달의 마지막 요일 | 24년 6월 30일 => 일요일(0)

  // 첫 번째 날의 요일 IDX만큼 유동적으로 공백 배열을 생성
  const blankColumnFront = Array.from({ length: weekStart }, () => null);
  // 마지막 요일의 IDX만큼 유동적으로 공백 배열을 생성
  const blankColumnBack = Array.from({ length: 6 - weekLast }, () => null);

  // 현재 연도의 월의 마지막 날짜를 기준으로 유동적으로 배열을 생성  curr(31), idx
  const days = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1); // lastDay.getDate() === 31

  return [...blankColumnFront, ...days, ...blankColumnBack];
}

export default generateCalendar;
