import React, { useState } from "react";
import { Divider, Table, Button, Tag, Modal, Form, Input } from "antd";
import Column from "antd/lib/table/Column";

interface TodoTableItem {
  key: string;
  name: string;
  status: string[];
}

const Todo = () => {
  const [todoList, setTodoList] = useState<Array<TodoTableItem>>([]);
  const [doneList, setDoneList] = useState<TodoTableItem[]>([]);
  const [modal, setModal] = useState<boolean>();

  const onModalOk = () => setModal(false);
  const onModalCancel = () => setModal(false);
  const onButtonClick = () => setModal(true);
  const onFormFinish = (value: any) => {
    setTodoList([
      ...todoList,
      { key: value.name, name: value.name, status: value.status.split(" ") }
    ]);
    setModal(false);
  };
  const onItemDelete = (key: string, from: "todo" | "done") => {
    if (from === "done") {
      setDoneList(doneList.filter(item => item.key !== key));
    } else if (from === "todo") {
      setTodoList(todoList.filter(item => item.key !== key));
    }
  };
  const onItemChange = (key: string, from: "todo" | "done") => {
    if (from === "todo") {
      const item = todoList.find(item => item.key === key);
      if (item) {
        setTodoList(todoList.filter(item => item.key !== key));
        setDoneList([...doneList, item]);
      }
    } else if (from === "done") {
      const item = doneList.find(item => item.key === key);
      if (item) {
        setDoneList(doneList.filter(item => item.key !== key));
        setTodoList([...todoList, item]);
      }
    }
  };
  return (
    <div>
      <Button onClick={onButtonClick}>Add Todo</Button>
      <Modal
        title="Add TODO"
        visible={modal}
        onOk={onModalOk}
        onCancel={onModalCancel}
        footer={null}
      >
        <Divider>Add new things to your Todo List.</Divider>
        <Form onFinish={onFormFinish}>
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="status" name="status">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Sumbit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Divider orientation="left">Todo List:</Divider>
      <Table dataSource={todoList}>
        <Column title="name" dataIndex="name" key="name" />
        <Column
          title="status"
          dataIndex="status"
          key="status"
          render={(status: string[]) => (
            <span>
              {status.map(s => (
                <Tag color="blue" key={s}>
                  {s}
                </Tag>
              ))}
            </span>
          )}
        />
        <Column
          title="operation"
          key="operation"
          render={(text, record: any, index) => (
            <span>
              <Button onClick={() => onItemChange(record.key, "todo")}>
                Finish it!
              </Button>
              <Button onClick={() => onItemDelete(record.key, "todo")}>
                Delete
              </Button>
            </span>
          )}
        />
      </Table>
      <Divider orientation="left">Done List:</Divider>
      <Table dataSource={doneList}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="status"
          dataIndex="status"
          key="status"
          render={(status: string[]) => (
            <span>
              {status.map(s => (
                <Tag color="blue" key={s}>
                  {s}
                </Tag>
              ))}
            </span>
          )}
        />
        <Column
          title="operation"
          key="operation"
          render={(text, record: any, index) => (
            <span>
              <Button onClick={() => onItemChange(record.key, "done")}>
                UNDO
              </Button>
              <Button onClick={() => onItemDelete(record.key, "done")}>
                Delete
              </Button>
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default Todo;
