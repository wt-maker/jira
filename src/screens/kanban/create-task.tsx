import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/use-tasks";
import { useProjectIdInUrl, useTaskQueryKey } from "screens/kanban/utils";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [inputMode, setInputMode] = useState(false);
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());
  const projectId = useProjectIdInUrl();

  const toggle = () => setInputMode((mode) => !mode);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName("");
  };

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="需要做些什么"
        autoFocus={true}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        onPressEnter={submit}
      />
    </Card>
  );
};
