import { Modal } from "antd";
import { useEffect, useState } from "react";

const ModalBuy = (props) => {
  const handleOk = () => {
    props.modalPayment(true);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  const handleChange = (e) => {
    const quantity = e.target.value;
    props.setTotalPrice(quantity * props.price);
  };
  return (
    <Modal
      zIndex={100}
      title={"How many books do you want to buy?"}
      open={props.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Price: {props.price} VND</p>
      <input type="number" onChange={handleChange} />
      <p>Total price: {props.totalPrice}</p>
    </Modal>
  );
};
export default ModalBuy;
