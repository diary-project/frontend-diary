import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // 로컬 스토리지에서 초기 값 가져오기
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error('로컬스토리지에서 데이터를 가져오는데 실패했습니다 : ', err);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('로컬스토리지에 데이터를 세팅하는데 실패했습니다 : ', err);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
