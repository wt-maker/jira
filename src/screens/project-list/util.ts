import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryParam } from "utils/url";
import { useProject } from "utils/use-projects";

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

  const [{ editingProjectId }, setEditingProjectId] = useQueryParam([
    "editingProjectId",
  ]);

  const [_, setUrlParams] = useSearchParams();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });

  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || !!editingProject,
    open,
    close,
    editingProject,
    startEdit,
    isLoading,
  };
};
