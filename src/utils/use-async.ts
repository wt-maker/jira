import { useState } from "react";

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

export const useAsync = <T>(initialState?: State<T>) => {
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: T) => {
    setState({
      data,
      status: "success",
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      data: null,
      status: "error",
      error,
    });
  };

  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise对象");
    }
    setState({
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
    ...state,
  };
};
