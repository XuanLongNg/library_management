import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  Rate,
  Space,
  Table,
  Tag,
  notification,
} from "antd";
import axios from "axios";
import { URL_BASE } from "../../../constants";
import Style from "./style";
import moment from "moment";

const HistoryPurchase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFeedbackOpen, setIsModalFeedbackOpen] = useState(false);

  const [record, setRecord] = useState();
  const columns = [
    {
      title: "Id bill",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Id item",
      dataIndex: "id_item",
      key: "id_item",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Time start",
      dataIndex: "time_start",
      key: "time_start",
    },
    {
      title: "Time end",
      dataIndex: "time_end",
      key: "time_end",
    },
    {
      title: "Price",
      dataIndex: "money",
      key: "money",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => <Tag color="#f50">{item}</Tag>,
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                window.location.href = "/bill/" + record.id + "/view";
              }}
            >
              View
            </Button>
            {record.status === "unpaid" && (
              <Button
                danger
                type="primary"
                onClick={() => {
                  setRecord(record);
                  showModal();
                }}
              >
                Cancel order
              </Button>
            )}
            {record.status === "paid" && (
              <Button
                type="primary"
                onClick={() => {
                  setRecord(record);
                  showModalFeedback();
                }}
              >
                Feedback
              </Button>
            )}
          </Space>
        );
      },
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(record);
    setIsModalOpen(false);
    handleCancelBill();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleFeedback = async () => {
    try {
      const url = URL_BASE + "/api/user/addFeedback";
      const data = {
        id_user: record.id_user,
        id_item: record.id_item,
        name: localStorage.name,
        star: valueRating,
        comment: feedback,
        time: moment(new Date()).format("YYYY-MM-DD"),
      };
      console.log("Data send1: ", data);
      const response = await axios.post(url, data);
      if ((response.message = "Success")) {
        notification.success({ message: "Success" });
      } else {
        notification.error({ message: "error" });
      }
      setRerender(rerender + 1);
    } catch (error) {
      notification.error({ message: "Bad request" });
      throw error;
    }
  };
  const showModalFeedback = () => {
    setIsModalFeedbackOpen(true);
  };

  const handleFeedbackOk = () => {
    console.log(record);
    setIsModalFeedbackOpen(false);
    handleFeedback();
  };

  const handleFeedbackCancel = () => {
    setIsModalFeedbackOpen(false);
  };
  const [data, setData] = useState();
  const [rerender, setRerender] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handleCancelBill = async () => {
    try {
      const url = URL_BASE + "/api/user/updateBill";
      const data = {
        id: record.id,
        id_user: record.id_user,
        id_item: record.id_item,
        money: record.money,
        time: record.time,
        time_start: record.time_start,
        time_end: record.time_end,
        status: "cancelled",
      };
      console.log("Data send1: ", data);
      const response = await axios.post(url, data);
      if ((response.message = "Success")) {
        notification.success({ message: "Success" });
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
      const url = URL_BASE + "/api/user/getBill/" + localStorage.id + "/user";
      console.log(url);
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    getData();
  }, [rerender]);
  const [feedback, setFeedback] = useState("");
  const [valueRating, setValueRating] = useState(0);
  if (isLoading) return <div>Loading...</div>;
  return (
    <Style>
      <h1 className="title">History</h1>
      <Modal
        title="Are you sure cancel this order?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <Modal
        title="Feedback"
        open={isModalFeedbackOpen}
        onOk={handleFeedbackOk}
        onCancel={handleFeedbackCancel}
      >
        <span>
          Rating:{" "}
          <Rate
            value={valueRating}
            onChange={(e) => {
              setValueRating(e);
            }}
          />
        </span>
        <Input
          placeholder="Feedback"
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Style>
  );
};

export default HistoryPurchase;
