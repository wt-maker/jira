import { Kanban } from "types/kanban";
import { useTaskTypes } from "utils/use-task-types";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Card } from "antd";
import styled from "@emotion/styled";
import { useTasks } from "utils/use-tasks";
import { useTasksSearchParams } from "./utils";

interface KanbanColumnProps {
  kanban: Kanban;
}

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((item) => item.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img src={name === "task" ? taskIcon : bugIcon}></img>;
};

export const KanbanColumn = ({ kanban }: KanbanColumnProps) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());

  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <h2>{kanban.name}</h2>
      <TaskContainer>
        {tasks?.map((task) => {
          return (
            <Card key={task.id} style={{ marginBottom: "0.5rem" }}>
              <div key={task.id}>{task.name}</div>
              <TaskTypeIcon id={task.id} />
            </Card>
          );
        })}
      </TaskContainer>
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
  background: rgb(244, 245, 247);
  border-radius: 1rem;
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
