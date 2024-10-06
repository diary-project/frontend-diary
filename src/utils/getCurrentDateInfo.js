export const getCurrentDateInfo = (dynamicDay) => {
  const currentDay = new Date();

  const currentDate = String(currentDay.getDate()).padStart(2, '0');
  const currentMonth = String(currentDay.getMonth() + 1).padStart(2, '0');
  const currentYear = currentDay.getFullYear();

  // dynamicDay.month를 문자열로 변환한 후 padStart 사용
  const targetMonth = String(dynamicDay.month).padStart(2, '0');
  const targetYear = dynamicDay.year;

  // 일기 데이터 조회용 포맷팅
  const formattedQuery = `year=${targetYear}&month=${targetMonth}`;

  return {
    currentDate,
    currentYear,
    currentMonth,
    targetMonth,
    targetYear,
    formattedQuery,
  };
};
