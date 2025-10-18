"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { decrement, increment } from "@/state-management/features/counterSlice";

export default function Counter() {
  // Get the current count from the Redux store
  const count = useAppSelector((state) => state.counter.value);
  // Get the dispatch function to send actions to the store
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
