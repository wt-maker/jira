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
