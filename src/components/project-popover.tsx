import styled from "@emotion/styled";
import { useProjects } from "utils/use-projects";
import { Popover, List, Typography, Divider } from "antd";
import { NoPaddingButton } from "components/lib";

const ProjectPopover = ({
  setProjectModalOpen,
}: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects } = useProjects();

  const pinnedProjects = projects?.filter((project) => project.pin);

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
      <NoPaddingButton type="link" onClick={() => setProjectModalOpen(true)}>
        创建项目
      </NoPaddingButton>
    </ContendContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContendContainer = styled.div`
  min-width: 30rem;
`;

export default ProjectPopover;
