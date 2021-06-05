import styled from "@emotion/styled";
import { useProjects } from "utils/use-projects";
import { Popover, List, Typography, Divider } from "antd";
import { NoPaddingButton } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";

const ProjectPopover = () => {
  const { data: projects } = useProjects();

  const pinnedProjects = projects?.filter((project) => project.pin);

  const dispatch = useDispatch();

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
      <NoPaddingButton
        type="link"
        onClick={() => dispatch(projectListActions.openProjectModal())}
      >
        添加项目
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
