import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, notification } from "antd";
import axios from "axios";
import { URL_BASE } from "../../constants";
import Style from "./style";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const BookList = () => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (item) => <Tag color="#f50">{item}</Tag>,
    },
    {
      title: "Action",
      key: "id",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                window.location.href = "/book/" + data.id + "/view";
              }}
            >
              View
            </Button>
            <Button danger type="primary" onClick={() => handleDelete(data.id)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  const [data, setData] = useState();
  const [rerender, setRerender] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (id) => {
    try {
      const url = URL_BASE + "/api/user/deleteBook/" + id;
      console.log(url);
      const response = await axios.get(url);
      if ((response.message = "success")) {
        notification.success({ message: "success" });
      } else {
        notification.error({ message: "error" });
      }
      setRerender(rerender + 1);
    } catch (error) {
      notification.error({ message: "Bad request" });
      throw error;
    }
  };
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const url = URL_BASE + "/api/user/getBooks";
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    getData();
  }, [rerender]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <Style>
      <h1>Library</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          window.location.href = "/book/0/new";
        }}
      >
        Add Book
      </Button>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Style>
  );
};

export default BookList;
