import React from "react";
import { useTaskTypes } from "utils/use-task-types";
import IdSelect from "./id-select";

export const TaskSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes();

  return <IdSelect options={taskTypes || []} {...props} />;
};
