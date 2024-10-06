export const getFormattedDay = (day) => {
  const year = day.split('-').join('').slice(0, 4);
  const month = day.split('-').join('').slice(4, 6);
  const date = day.split('-').join('').slice(6);

  return `${year}년 ${month}월 ${date}일`;
};
