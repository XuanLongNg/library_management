import React, { useState } from "react";
import { Button, Modal, notification } from "antd";
import { URL_BASE } from "../../../../../constants";
import { useParams } from "react-router";
import moment from "moment";
import axios from "axios";
import Style from "./style";

const ModalPayment = (props) => {
  const { id } = useParams();
  const handleOk = () => {
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  const handleApi = async (money, action) => {
    if (money <= 0) {
      notification.error({
        message: "The total price must be at least greater than 0",
      });
      return;
    }
    try {
      const url = URL_BASE + "/api/user/createBill";
      const data = {
        id_user: localStorage.id,
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
        });
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
    <Style
      zIndex={101}
      open={props.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      <h3>The total amount you need to pay is {props.totalPrice} vnd</h3>
      <p>Do you want to pay now or leave it for later? </p>
      <div className="d-flex flex-row-reverse">
        <Button className="btn-confirm" type="primary" onClick={handlePurchase}>
          Purchase
        </Button>
        <Button className="btn-confirm" type="primary" onClick={handleLater}>
          Later
        </Button>
        <Button className="btn-confirm" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Style>
  );
};

export default ModalPayment;
