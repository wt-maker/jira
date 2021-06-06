import { Drawer } from "antd";
import { useProjectModalParams } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModalParams();

  return (
    <Drawer onClose={close} visible={projectModalOpen} width="100%">
      <h1>创建项目</h1>
    </Drawer>
  );
};
