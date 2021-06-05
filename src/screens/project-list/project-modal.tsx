import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectModalOpen,
  projectListActions,
} from "./project-list.slice";

export const ProjectModal = () => {
  const projectModalOpen = useSelector(selectProjectModalOpen);

  const dispatch = useDispatch();

  return (
    <Drawer
      visible={projectModalOpen}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      width="100%"
    >
      <h1>创建项目</h1>
    </Drawer>
  );
};
