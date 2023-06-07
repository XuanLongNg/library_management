import { Card, Dropdown, List, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { URL_BASE } from "../../../constants";
import axios from "axios";
import Style from "./style";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import moment from "moment";
const data = [
  {
    title: "One piece",
    author: "Eiichiro Oda",
    image:
      "https://firebasestorage.googleapis.com/v0/b/quiz-d364f.appspot.com/o/default-thumbnail.jpg?alt=media&token=574f86da-559e-4a5d-a074-2b80bc211553&_gl=1*13sbxxd*_ga*MzczNDAyOTQ5LjE2ODA4ODU2OTU.*_ga_CW55HF8NVT*MTY4NTUzNzU4OS42NC4xLjE2ODU1Mzc4NDQuMC4wLjA.",
    category: "Supernatural",
  },
  {
    title: "One piece",
    author: "Eiichiro Oda",
    image:
      "https://firebasestorage.googleapis.com/v0/b/quiz-d364f.appspot.com/o/default-thumbnail.jpg?alt=media&token=574f86da-559e-4a5d-a074-2b80bc211553&_gl=1*13sbxxd*_ga*MzczNDAyOTQ5LjE2ODA4ODU2OTU.*_ga_CW55HF8NVT*MTY4NTUzNzU4OS42NC4xLjE2ODU1Mzc4NDQuMC4wLjA.",
    category: "Supernatural",
  },
];

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
        grid={{ gutter: 16, column: 6 }}
        dataSource={data}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 12,
        }}
        renderItem={(item) => {
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
                  onClick={(e) => e.preventDefault()}
                  className="container-card"
                  href={item.image}
                >
                  <div
                    className="card"
                    style={{ backgroundImage: `url(${item.image})` }}
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
