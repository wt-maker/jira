import { Modal, Form, Input, Button } from "antd";
import { UserSelect } from "components/user-select";
import { TaskSelect } from "components/task-select";
import { useForm } from "antd/lib/form/Form";
import { useTasksModal, useTaskQueryKey } from "./utils";
import { useDeleteTask, useEditTask } from "utils/use-tasks";
import { useEffect } from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();

  const { editingTaskId, editingTask, close } = useTasksModal();

  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTaskQueryKey()
  );

  const { mutateAsync: deleteTask } = useDeleteTask(useTaskQueryKey());

  const onCancel = () => {
    form.resetFields();
    close();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除任务？",
      onOk: () => deleteTask({ id: Number(editingTaskId) }),
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      visible={!!editingTaskId && !!editingTask}
      forceRender={true}
      onCancel={onCancel}
      cancelText="取消"
      onOk={onOk}
      okText="确定"
      confirmLoading={editLoading}
      title="编辑任务"
    >
      <Form {...layout} form={form} initialValues={editingTask}>
        <Form.Item
          label="任务名"
          name="name"
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="经办人" name="processorId">
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item label="类型" name="typeId">
          <TaskSelect defaultOptionName="0" />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button
          type="link"
          onClick={startDelete}
          style={{ fontSize: "14px" }}
          size="small"
        >
          删除
        </Button>
      </div>
    </Modal>
  );
};
