import { QueryKey, useQueryClient } from "react-query";
import { Task } from "types/task";
import { reorder } from "./reorder";

export const useOptimisticOptions = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onMutate: async (target: any) => {
      const previousData: any = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old?: any[]) =>
        callback(target, old)
      );

      return { previousData };
    },
  };
};

export const useUpdataConfig = (queryKey: QueryKey) => {
  return useOptimisticOptions(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
};

export const useDeleteConfig = (queryKey: QueryKey) => {
  return useOptimisticOptions(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
};

export const useAddConfig = (queryKey: QueryKey) => {
  return useOptimisticOptions(queryKey, (target, old) =>
    old ? [...old, target] : []
  );
};

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) =>
    reorder({ list: old, ...target })
  );

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
