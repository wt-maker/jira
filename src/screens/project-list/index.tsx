import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useProjects } from "utils/use-projects";
import { useUsers } from "utils/use-users";
import { useProjectModalParams, useProjectSearchParams } from "./util";
import { useDocumentTitle } from "utils/use-document-title";
import {
  Row,
  NoPaddingButton,
  ErrorBox,
  ScreenContainer,
} from "components/lib";

const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectSearchParams();

  const { data: list, error, isLoading } = useProjects(param);

  const { data: users } = useUsers();

  const { open } = useProjectModalParams();

  return (
    <ScreenContainer>
      <Row between={true} marginBottom={2}>
        <h1>项目列表</h1>
        <NoPaddingButton type="link" onClick={open}>
          创建项目
        </NoPaddingButton>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </ScreenContainer>
  );
};

export default ProjectListScreen;
