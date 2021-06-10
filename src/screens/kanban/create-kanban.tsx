import { useState } from "react";
import { useKanbansQueryKey, useProjectIdInUrl } from "screens/kanban/utils";
import { Input } from "antd";
import { useAddKanban } from "utils/use-kanbans";
import { Container } from "screens/kanban/kanban-column";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());
  const projectId = useProjectIdInUrl();

  const submit = async () => {
    await addKanban({ projectId, name });
    setName("");
  };

  return (
    <Container>
      <Input
        size="large"
        placeholder="新建看板名称"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        onPressEnter={submit}
      />
    </Container>
  );
};
