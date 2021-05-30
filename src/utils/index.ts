import { useState, useEffect } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    const value = obj[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};
