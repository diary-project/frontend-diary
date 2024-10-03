function useYearMonth(currDate) {
  const year = currDate.getFullYear();
  const month = currDate.getMonth() + 1;

  return { year, month };
}

export default useYearMonth;
