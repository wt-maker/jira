import styled from "@emotion/styled";
import { useProjects } from "utils/use-projects";
import { Popover, List, Typography, Divider } from "antd";

const ProjectPopover = (props: { projectButton: JSX.Element }) => {
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
      {props.projectButton}
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
