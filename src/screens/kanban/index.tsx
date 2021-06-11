import { useDocumentTitle } from "utils/use-document-title";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTaskQueryKey,
  useTasksSearchParams,
} from "./utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { useKanbans, useReorderKanban } from "utils/use-kanbans";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "screens/kanban/task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { useReorderTask, useTasks } from "utils/use-tasks";

const Kanban = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading } = useKanbans(useKanbanSearchParams());

  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />

        {isLoading ? (
          <Spin size="large" />
        ) : (
          <ColumnsContainer>
            <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanban" + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());

  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());

  const { data: tasks = [] } = useTasks(useTasksSearchParams());

  const { mutate: reorderTask } = useReorderTask(useTaskQueryKey());

  return ({ source, destination, type }: DropResult) => {
    if (!destination) return;

    if (type === "COLUMN") {
      const fromId = kanbans?.[source.index].id;
      const toId = kanbans?.[destination.index].id;

      if (fromId === toId) return;

      const type = destination.index > source.index ? "after" : "before";

      if (!fromId || !toId || fromId === toId) return;

      reorderKanban({
        fromId,
        referenceId: toId,
        type,
      });
    }
    if (type === "ROW") {
      const fromKanbanId = +source.droppableId;
      const toKanbanId = +destination.droppableId;
      /* if (fromKanbanId === toKanbanId) {
        return;
      } */
      const fromTask = tasks.filter((task) => task.kanbanId === fromKanbanId)[
        source.index
      ];
      const toTask = tasks.filter((task) => task.kanbanId === toKanbanId)[
        destination.index
      ];
      if (fromTask?.id === toTask?.id) {
        return;
      }
      reorderTask({
        fromId: fromTask?.id,
        referenceId: toTask?.id,
        fromKanbanId,
        toKanbanId,
        type:
          fromKanbanId === toKanbanId && destination.index > source.index
            ? "after"
            : "before",
      });
    }
  };
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

export default Kanban;
