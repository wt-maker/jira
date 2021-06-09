import { useDocumentTitle } from "utils/use-document-title";
import { useKanbansInProject, useProjectInUrl } from "./utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";

const Kanban = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbansInProject();

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;

export default Kanban;
