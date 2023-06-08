import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";

const ModalRent = (props) => {
  const handleOk = () => {
    props.modalPayment(true);
  };

  const handleCancel = () => {
    props.setDay(0);
    props.setIsModalOpen(false);
  };
  const handleChange = (e) => {
    const quantity = e.target.value;
    props.setDay(quantity);
    props.setTotalPrice(quantity * props.price);
  };
  return (
    <div>
      <Modal
        zIndex={100}
        title={"How many days do you want to rent?"}
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Price: {props.price} VND per day</p>
        <input type="number" onChange={handleChange} />
        <p>Total price: {props.totalPrice}</p>
      </Modal>
    </div>
  );
};
export default ModalRent;
