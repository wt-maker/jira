import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type stateType<T> = {
  past: T[];
  future: T[];
  present: T;
};

type undoActionType<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof SET | typeof RESET | typeof REDO;
};

const undoReducer = <T>(state: stateType<T>, action: undoActionType<T>) => {
  const { past, future, present } = state;
  const { newPresent, type } = action;
  switch (type) {
    case UNDO:
      if (past.length === 0) return state;

      return {
        past: past.slice(0, state.past.length - 1),
        future: [past[past.length - 1], ...future],
        present: past[past.length - 1],
      };
    case REDO:
      if (future.length === 0) return state;
      return {
        past: [...past, future[0]],
        future: future.slice(1, future.length),
        present: future[0],
      };
    case SET:
      if (present === newPresent) return state;
      return {
        past: [...past, newPresent],
        future: [],
        present: newPresent,
      };
    case RESET:
      return {
        past: [],
        future: [],
        present: newPresent,
      };
    default:
      return state;
  }
};

export const useUndo = <T>(initailPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    future: [],
    present: initailPresent,
  } as stateType<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent });
  }, []);

  const reset = useCallback((newPresent: T) => {
    dispatch({ type: RESET, newPresent });
  }, []);

  return [state, { undo, redo, set, reset, canUndo, canRedo }] as const;
};
