import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { useDebounce } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  const debouncedParam = useDebounce(param, 200);

  const fetchProject = () => client("projects", { data: debouncedParam });

  useEffect(() => {
    run(fetchProject(), {
      retry: fetchProject,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  return {
    ...result,
  };
};

export const useEditProject = () => {
  const { run, ...rest } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...rest,
  };
};

export const useAddProject = () => {
  const { run, ...rest } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...rest,
  };
};
