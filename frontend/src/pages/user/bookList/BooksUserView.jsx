import { Card, Dropdown, List, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { URL_BASE } from "../../../constants";
import axios from "axios";
import Style from "./style";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import moment from "moment";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const BooksUserView = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      try {
        const url = URL_BASE + "/api/user/getBooks";
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  return (
    <Style>
      <List
        className="list-card"
        grid={{
          gutter: 16,
          column: 6,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 6,
        }}
        dataSource={data}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 12,
        }}
        renderItem={(item) => {
          console.log(item.image);
          const items = [
            {
              key: "1",
              label: (
                <div
                  style={{
                    maxWidth: "300px",
                    maxHeight: "35vh",
                    overflow: "hidden",
                  }}
                  className="dropdown-content"
                >
                  <h3 style={{ margin: "0" }}>{item.title}</h3>
                  <p style={{ margin: "0" }}>Author: {item.author}</p>
                  <div style={{ margin: "0" }}>
                    Category:{" "}
                    <Tag className="author" color="#2db7f5">
                      {item.category}
                    </Tag>
                  </div>
                  <p style={{ margin: "0" }}>
                    Release date:{" "}
                    {moment(item.release_date).format("DD/MM/YYYY")}
                  </p>
                  <p style={{ margin: "0" }}>Description: {item.description}</p>
                </div>
              ),
            },
          ];
          return (
            <List.Item
              className="item"
              data-aos="fade-down"
              data-aos-easing="ease-in-out"
            >
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a
                  className="container-card"
                  href={`/book/${item.id}/view`}
                  target="_blank"
                >
                  <div
                    className="card"
                    style={{
                      background: `url("${item.image}") no-repeat center/cover`,
                    }}
                  >
                    <div className="content d-flex justify-content-end align-items-start flex-column">
                      <p className="title">{item.title}</p>

                      <Tag className="author" color="#2db7f5">
                        {item.author}
                      </Tag>
                      <div className="d-flex">
                        <div className="d-flex align-items-center justify-content-center star">
                          <StarOutlined className="icon-img" />
                          <p className="content-icon">4/5</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center star">
                          <MessageOutlined className="icon-img" />
                          <p className="content-icon">4</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Dropdown>
            </List.Item>
          );
        }}
      />
    </Style>
  );
};

export default BooksUserView;
