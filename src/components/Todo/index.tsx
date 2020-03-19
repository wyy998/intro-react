import React, { useState } from "react";
import { Divider, Table, Button, Tag, Modal, Form, Input } from "antd";
import Column from "antd/lib/table/Column";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { createHash } from "crypto";

interface TodoTableItem {
  key: string;
  name: string;
  status: string[];
}
const ColorLen = 11;
enum TagColor {
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple"
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
      {
        key: value.name,
        name: value.name,
        status: ["TODO"].concat(value.status.split(" "))
      }
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
        item.status[0] = "DONE";
        setTodoList(todoList.filter(item => item.key !== key));
        setDoneList([...doneList, item]);
      }
    } else if (from === "done") {
      const item = doneList.find(item => item.key === key);
      if (item) {
        item.status[0] = "TODO";
        setDoneList(doneList.filter(item => item.key !== key));
        setTodoList([...todoList, item]);
      }
    }
  };
  // Make Tag more colorful
  const mappingStringToColor = (s: string) => {
    const hash = createHash("sha256");
    hash.update(s);
    let num = parseInt(hash.digest("hex"), 16);
    return TagColor[num % ColorLen];
  };
  return (
    <div>
      <Modal
        title="Add TODO"
        visible={modal}
        onOk={onModalOk}
        onCancel={onModalCancel}
        footer={null}
        destroyOnClose
      >
        <Divider>Add new things to your Todo List.</Divider>
        <Form onFinish={onFormFinish} layout="vertical">
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="status" name="status">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sumbit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Divider orientation="left">
        Todo List:
        <Divider type="vertical" />
        <Button
          onClick={onButtonClick}
          type="primary"
          icon={<AppstoreAddOutlined />}
        >
          Add Todo
        </Button>
      </Divider>
      <Table dataSource={todoList}>
        <Column title="name" dataIndex="name" key="name" />
        <Column
          title="status"
          dataIndex="status"
          key="status"
          render={(status: string[]) => (
            <span>
              {status.map(s => (
                <Tag color={mappingStringToColor(s)} key={s}>
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
                <Tag color={mappingStringToColor(s)} key={s}>
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
