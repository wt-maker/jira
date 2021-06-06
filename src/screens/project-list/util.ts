import { useMemo } from "react";
import { useQueryParam } from "utils/url";

export const useProjectSearchParams = () => {
  const [param, setParam] = useQueryParam(["name", "personId"]);

  const projectsParam = useMemo(
    () => ({ ...param, personId: Number(param.personId) || undefined }),
    [param]
  );

  return [projectsParam, setParam] as const;
};

export const useProjectModalParams = () => {
  const [{ projectCreate }, setProjectCreate] = useQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });

  const close = () => setProjectCreate({ projectCreate: undefined });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
