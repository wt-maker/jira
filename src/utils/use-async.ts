import { useState, useReducer, useCallback } from "react";
import { useMountedRef } from "utils";

interface State<T> {
  error: Error | null;
  data: T | null;
  status: "idle" | "loading" | "success" | "error";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  status: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({
      ...state,
      ...action,
    }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);

  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  const setData = (data: T) => {
    safeDispatch({
      data,
      status: "success",
      error: null,
    });
  };

  const setError = (error: Error) => {
    safeDispatch({
      data: null,
      status: "error",
      error,
    });
  };

  const [retry, setRetry] = useState(() => () => {});

  const run = (
    promise: Promise<T>,
    runConfig?: { retry?: () => Promise<T> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise对象");
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    safeDispatch({
      ...state,
      status: "loading",
    });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      });
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
