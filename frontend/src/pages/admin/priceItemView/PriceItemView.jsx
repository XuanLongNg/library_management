import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Select, notification } from "antd";
import { useParams } from "react-router";
import { URL_BASE } from "../../../constants";
import axios from "axios";

const { Option } = Select;

const PriceItemView = () => {
  const { id, action } = useParams();
  const formRef = useRef();
  console.log(id);
  const handleSendData = async () => {
    const values = formRef.current.getFieldsValue();
    try {
      console.log(values);
      const actionApi = action === "edit" ? "updateItem" : "addItem";
      const url = URL_BASE + `/api/user/${actionApi}`;
      const response = await axios.post(url, values);
      notification.success({
        message:
          action === "edit" ? "Update complete" : "Added item successfully",
        description: "You will return to the list after 3s",
      });
      setTimeout(() => {
        window.location.href = "/admin/books";
      }, 3000);
    } catch (error) {
      notification.error({
        message: "Error",
      });
    }
  };
  const onFinish = () => {
    showModal();
  };
  useEffect(() => {
    const getValues = async () => {
      try {
        const url = URL_BASE + "/api/user/getItem/" + id;
        const response = await axios.get(url);
        if (!response.data.message) {
          formRef.current.setFieldsValue(response.data);
        } else {
          const data = {
            id: id,
          };
          formRef.current.setFieldsValue(data);
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    getValues();
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleSendData();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Id" name="id">
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Cost"
          name="cost"
          rules={[{ required: true, message: "Please input your Cost!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Purchase price" name="purchase_price">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Rent price" name="rent_price">
          <Input type="number" addonAfter={"per day"} />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter quantity!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select>
            <Option value="for sale">For sale</Option>
            <Option value="out of stock">Out of stock</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Are you sure to submit?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </div>
  );
};
export default PriceItemView;
