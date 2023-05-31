import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import axios from "axios";
import { URL_BASE } from "../../constants";
import Style from "./style";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
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
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary">View</Button>
        <Button danger type="primary">
          Delete
        </Button>
      </Space>
    ),
  },
];

const BookList = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return (
    <Style>
      <h1>Library</h1>
      <Button type="primary" icon={<PlusOutlined />}>
        Add Book
      </Button>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Style>
  );
};

export default BookList;
