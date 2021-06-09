import { Kanban } from "types/kanban";
import { useTasksInProject } from "./utils";

interface KanbanColumnProps {
  kanban: Kanban;
}

export const KanbanColumn = ({ kanban }: KanbanColumnProps) => {
  const { data: allTasks } = useTasksInProject();

  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <div>
      <h2>{kanban.name}</h2>
      {tasks?.map((task) => {
        return <div key={task.id}>{task.name}</div>;
      })}
    </div>
  );
};
