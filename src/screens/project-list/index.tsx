import styled from "@emotion/styled";
import { Typography } from "antd";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useProjects } from "utils/use-projects";
import { useUsers } from "utils/use-users";
import { useProjectSearchParams } from "./util";
import { useDocumentTitle } from "utils/use-document-title";
import { Row } from "components/lib";
import { projectListActions } from "./project-list.slice";
import { NoPaddingButton } from "components/lib";
import { useDispatch } from "react-redux";

const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const dispatch = useDispatch();

  const [param, setParam] = useProjectSearchParams();

  const { data: list, error, isLoading, retry } = useProjects(param);

  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <NoPaddingButton
          type="link"
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          添加项目
        </NoPaddingButton>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : (
        ""
      )}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
