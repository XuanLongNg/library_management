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
                <div>
                  <h3>{item.title}</h3>
                  <p>Author: {item.author}</p>
                  <p>Description: {item.description}</p>
                  <div>
                    Category:{" "}
                    <Tag className="author" color="#2db7f5">
                      {item.category}
                    </Tag>
                  </div>
                  <p>
                    Release date:{" "}
                    {moment(item.release_date).format("DD/MM/YYYY")}
                  </p>
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
                        <IconText
                          icon={StarOutlined}
                          text={"4" + "/5"}
                          key="list-vertical-star-o"
                        />
                        <IconText
                          icon={MessageOutlined}
                          text={"4"}
                          key="list-vertical-message"
                        />
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
