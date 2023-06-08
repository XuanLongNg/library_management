import React, { useState } from "react";
import { Button, Modal, notification } from "antd";
import { URL_BASE } from "../../../../../constants";
import { useParams } from "react-router";
import moment from "moment";
import axios from "axios";

const ModalPayment = (props) => {
  const { id } = useParams();
  const handleOk = () => {
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  const handleApi = async (money, action) => {
    try {
      const url = URL_BASE + "/api/user/createBill";
      const data = {
        id_user: 1,
        id_item: id,
        time: moment(new Date()).format("YYYY/MM/DD"),
        time_start:
          action == "purchase" && props.day != 0
            ? moment(new Date()).format("YYYY/MM/DD")
            : null,
        time_end:
          action == "purchase" && props.day != 0
            ? moment(new Date()).add(props.day, "days").format("YYYY/MM/DD")
            : null,
        money: money,
        status: action == "purchase" ? "paid" : "unpaid",
      };
      const response = await axios.post(url, data);
      if (response.data.message === "Success") {
        notification.success({
          message: "Success",
          description: "You will return list after 3s",
        });
        setTimeout(() => {
          window.location.href = "/books";
        }, 3000);
      } else {
        notification.error({ message: "Error" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePurchase = () => {
    handleApi(props.totalPrice, "purchase");
    props.modalBuy(false);
    props.modalRent(false);
    props.setIsModalOpen(false);
  };
  const handleLater = () => {
    handleApi(props.totalPrice, "later");
    props.modalBuy(false);
    props.modalRent(false);
    props.setIsModalOpen(false);
  };
  return (
    <Modal
      zIndex={101}
      title="Basic Modal"
      open={props.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      <h3>The total amount you need to pay is {props.totalPrice} vnd</h3>
      <p>Do you want to pay now or leave it for later? </p>
      <Button onClick={handlePurchase}>Purchase</Button>
      <Button onClick={handleLater}>Later</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </Modal>
  );
};

export default ModalPayment;
