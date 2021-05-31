import { User } from "screens/project-list/search-panel";
import { Table } from "antd";

interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
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
      ]}
    ></Table>
  );
};
