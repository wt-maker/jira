import styled from "@emotion/styled";
import { Typography, Button } from "antd";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useProjects } from "utils/use-projects";
import { useUsers } from "utils/use-users";
import { useProjectSearchParams } from "./util";
import { useDocumentTitle } from "utils/use-document-title";
import { Row } from "components/lib";

const ProjectListScreen = ({
  setProjectModalOpen,
}: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectSearchParams();

  const { data: list, error, isLoading, retry } = useProjects(param);

  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button type="link" onClick={() => setProjectModalOpen(true)}>
          创建项目
        </Button>
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
        setProjectModalOpen={setProjectModalOpen}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
