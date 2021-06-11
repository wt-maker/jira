import { useQuery, useMutation, QueryKey } from "react-query";
import { Project } from "types/project";
import { Task } from "types/task";
import { useHttp } from "./http";
import { SortProps } from "./use-kanbans";
import {
  useUpdataConfig,
  useDeleteConfig,
  useAddConfig,
  useReorderTaskConfig,
} from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", {
      data: param,
    })
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: Partial<Task>) => {
    return client(`tasks`, {
      method: "POST",
      data: params,
    });
  }, useAddConfig(queryKey));
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: Partial<Task>) => {
    return client(`tasks/${params.id}`, {
      method: "PATCH",
      data: params,
    });
  }, useUpdataConfig(queryKey));
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(({ id }: { id: number }) => {
    return client(`tasks/${id}`, {
      method: "DELETE",
    });
  }, useDeleteConfig(queryKey));
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
