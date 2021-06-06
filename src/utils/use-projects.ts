import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
import { useQuery, useQueryClient, useMutation } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", param], () => {
    return client("projects", { data: param });
  });
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  const mutate = useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );

  return mutate;
};

export const useAddProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};
