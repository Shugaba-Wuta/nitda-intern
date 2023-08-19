import { useState } from "react";

export const useLocalStorage = (
  keyName: string,
  defaultValue: string | object | null
) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = window.localStorage.getItem(keyName);
    if (value) {
      return JSON.parse(value);
    } else {
      window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });
  const setValue = (newValue: string | object) => {
    window.localStorage.setItem(keyName, JSON.stringify(newValue));
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
