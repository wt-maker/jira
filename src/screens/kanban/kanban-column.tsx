import { Kanban } from "types/kanban";
import { useTaskTypes } from "utils/use-task-types";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import styled from "@emotion/styled";
import { useTasks } from "utils/use-tasks";
import {
  useKanbansQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "./utils";
import { CreateTask } from "screens/kanban/create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { Row } from "components/lib";
import { useDeleteKanban } from "utils/use-kanbans";

interface KanbanColumnProps {
  kanban: Kanban;
}

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((item) => item.id === id)?.name;
  if (!name) {
    return null;
  }
  return (
    <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon}></img>
  );
};

export const KanbanColumn = ({ kanban }: KanbanColumnProps) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());

  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <Row between={true}>
        <h2>{kanban.name}</h2>
        <More kanban={kanban} />
      </Row>

      <TaskContainer>
        {tasks?.map((task) => {
          return <TaskCard task={task} key={task.id} />;
        })}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();

  const { name: keyword } = useTasksSearchParams();

  return (
    <Card
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      onClick={() => startEdit(task.id)}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.id} />
    </Card>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey());

  const startDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return deleteKanban({ id: kanban.id });
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item key="delete">
        <Button type="link" onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
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
