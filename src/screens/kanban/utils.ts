import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useDebounce } from "utils";
import { useQueryParam } from "utils/url";
import { useProject } from "utils/use-projects";
import { useTask } from "utils/use-tasks";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param] = useQueryParam(["name", "typeId", "processorId", "tagId"]);
  const debounceName = useDebounce(param.name, 200);

  const projectId = useProjectIdInUrl();

  return useMemo(() => {
    return {
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debounceName,
    };
  }, [debounceName, projectId, param]);
};

export const useTaskQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useQueryParam([
    "editingTaskId",
  ]);

  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    isLoading,
    startEdit,
    close,
  };
};
