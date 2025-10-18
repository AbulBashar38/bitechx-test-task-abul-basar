import { useCallback, useRef } from "react";

export function useDebounce(
  func: (...args: unknown[]) => unknown,
  delay: number
): (...args: unknown[]) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: unknown[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  );
}
