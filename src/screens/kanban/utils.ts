import { useMemo } from "react";
import { useLocation } from "react-router";
import { useQueryParam } from "utils/url";
import { useProject } from "utils/use-projects";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams];

export const useTasksSearchParams = () => {
  const [param] = useQueryParam(["name", "typeId", "processorId", "tagId"]);

  const projectId = useProjectIdInUrl();

  return useMemo(() => {
    return {
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    };
  }, [param, projectId]);
};

export const useTaskQueryKey = () => ["tasks", useTasksSearchParams];
