import { useDocumentTitle } from "utils/use-document-title";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { useKanbans } from "utils/use-kanbans";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "screens/kanban/task-modal";

const Kanban = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading } = useKanbans(useKanbanSearchParams());

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn key={kanban.id} kanban={kanban} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

export default Kanban;
