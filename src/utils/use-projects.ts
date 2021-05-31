import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { useDebounce } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  const debouncedParam = useDebounce(param, 200);

  useEffect(() => {
    run(client("projects", { data: debouncedParam }));
  }, [debouncedParam]);

  return {
    ...result,
  };
};
