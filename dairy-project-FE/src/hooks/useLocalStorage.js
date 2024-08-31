function useLocalStorage(key, value) {
  const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

  return [setLocalStorage, getLocalStorage];
}

export default useLocalStorage;
