import styled from "@emotion/styled";
import { useProjects } from "utils/use-projects";
import { Popover, List, Typography, Divider } from "antd";
import { useProjectModalParams } from "screens/project-list/util";
import { NoPaddingButton } from "components/lib";

const ProjectPopover = () => {
  const { data: projects, refetch } = useProjects();

  const pinnedProjects = projects?.filter((project) => project.pin);

  const { open } = useProjectModalParams();

  const content = () => (
    <ContendContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((pinnedProject) => {
          return (
            <List.Item key={pinnedProject.id}>{pinnedProject.name}</List.Item>
          );
        })}
      </List>
      <Divider />
      <NoPaddingButton type="link" onClick={open}>
        创建项目
      </NoPaddingButton>
    </ContendContainer>
  );

  return (
    <Popover
      placement="bottom"
      content={content}
      onVisibleChange={() => refetch()}
    >
      <span>项目</span>
    </Popover>
  );
};

const ContendContainer = styled.div`
  min-width: 30rem;
`;

export default ProjectPopover;
