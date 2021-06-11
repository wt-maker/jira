import React, { useState } from "react";
import { Row, ScreenContainer } from "components/lib";
import { useProjectInUrl, useTasksSearchParams } from "screens/kanban/utils";
import { useDeleteEpic, useEpics } from "utils/use-epics";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useTasks } from "utils/use-tasks";
import { Link } from "react-router-dom";
import { useEpicSearchParams, useEpicsQueryKey } from "screens/epic/utils";
import { Epic } from "types/epic";
import { CreateEpic } from "screens/epic/create-epic";

const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>快递管理任务组</h1>
        <Button
          type="link"
          onClick={() => {
            setEpicCreateOpen(true);
          }}
        >
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout="vertical"
        renderItem={(epic) => {
          return (
            <List.Item>
              <List.Item.Meta
                title={
                  <Row between={true}>
                    <span>{epic.name}</span>
                    <Button
                      onClick={() => confirmDeleteEpic(epic)}
                      type={"link"}
                    >
                      删除
                    </Button>
                  </Row>
                }
                description={
                  <div>
                    <div>
                      开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}
                    </div>
                    <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                  </div>
                }
              />
              <div>
                {tasks
                  ?.filter((task) => task.epicId === epic.id)
                  .map((task) => (
                    <Link
                      to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                      key={task.id}
                    >
                      <span style={{ marginRight: "1rem" }}>{task.name}</span>
                    </Link>
                  ))}
              </div>
            </List.Item>
          );
        }}
      ></List>
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};

export default EpicScreen;
