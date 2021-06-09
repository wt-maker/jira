import { User } from "screens/project-list/search-panel";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/use-projects";
import { NoPaddingButton } from "components/lib";
import { useProjectModalParams, useProjectsQueryKey } from "./util";

export interface Project {
  id: number;
  name: string;
  pin: boolean;
  personId: number;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, loading, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());

  const pinProject = (id: number) => (pin: boolean) => mutate({ id: id, pin });

  return (
    <Table
      rowKey={"id"}
      loading={loading}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render: (value, project) => {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              ></Pin>
            );
          },
        },
        {
          title: "名称",
          render: (value, project) => {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render: (value, project) => (
            <span>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </span>
          ),
        },
        {
          title: "创建时间",
          render: (value, project) => {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render: (value, project) => {
            return <More project={project}></More>;
          },
        },
      ]}
      {...props}
    ></Table>
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModalParams();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());

  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗",
      content: "点击确定删除",
      okText: "确定",
      onOk: () => {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit">
            <NoPaddingButton type="link" onClick={editProject(project.id)}>
              编辑
            </NoPaddingButton>
          </Menu.Item>
          <Menu.Item
            key="delete"
            onClick={() => confirmDeleteProject(project.id)}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <NoPaddingButton type="link">...</NoPaddingButton>
    </Dropdown>
  );
};
