import { Row } from "components/lib";
import { Input, Button } from "antd";
import { UserSelect } from "components/user-select";
import { TaskSelect } from "components/task-select";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./utils";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBottom={4}>
      <Input
        placeholder="任务名"
        style={{ width: "20rem" }}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskSelect
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清空筛选器</Button>
    </Row>
  );
};
