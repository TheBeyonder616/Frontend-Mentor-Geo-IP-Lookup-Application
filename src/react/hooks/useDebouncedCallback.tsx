import { useEffect, useRef } from "react";
type Callback<T extends (...args: any[]) => void> = T;
export type DebouncedFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;
const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: Callback<T>,
  delay: number
): DebouncedFunction<T> => {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [delay]);

  return (...args: Parameters<T>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => callback(...args), delay);
  };
};

export default useDebouncedCallback;
