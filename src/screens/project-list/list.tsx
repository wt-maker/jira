import { Dropdown, Menu, Table, TableProps } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Pin } from "components/pin";
import { User } from "screens/project-list/search-panel";
import { useEditProject } from "utils/use-projects";
import { NoPaddingButton } from "components/lib";
import { projectListActions } from "./project-list.slice";

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
  refresh?: () => void;
}

export const List = ({ refresh, users, ...props }: ListProps) => {
  const { mutate } = useEditProject();

  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id: id, pin }).then(() => {
      console.log(refresh);
      refresh?.();
    });

  const dispatch = useDispatch();

  return (
    <Table
      rowKey={"id"}
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
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      <NoPaddingButton
                        type="link"
                        onClick={() =>
                          dispatch(projectListActions.openProjectModal())
                        }
                      >
                        编辑项目
                      </NoPaddingButton>
                    </Menu.Item>
                  </Menu>
                }
              >
                <NoPaddingButton type="link">...</NoPaddingButton>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
