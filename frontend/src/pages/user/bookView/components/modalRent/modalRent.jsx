import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";

const ModalRent = (props) => {
  const [price, setPrice] = useState(1000);

  const [totalPrice, setTotalPrice] = useState(0);
  const showModal = () => {
    props.setIsModalOpen(true);
  };

  const handleOk = () => {
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  const handleChange = (e) => {
    const quantity = e.target.value;
    setTotalPrice(quantity * price);
  };
  return (
    <div>
      <Modal
        title={"How many days do you want to rent?"}
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Price: {price}VND per day</p>
        <input type="number" onChange={handleChange} />
        <p>Total price: {totalPrice}</p>
      </Modal>
    </div>
  );
};
export default ModalRent;
