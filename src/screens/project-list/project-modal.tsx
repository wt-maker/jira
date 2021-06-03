import { Drawer } from "antd";

interface ProjectModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ visible, onClose }: ProjectModalProps) => {
  return (
    <Drawer onClose={onClose} visible={visible} width="100%">
      <h1>创建项目</h1>
    </Drawer>
  );
};
