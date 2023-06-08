import { Modal } from "antd";
import { useEffect, useState } from "react";

const ModalBuy = (props) => {
  const [price, setPrice] = useState(10000);

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
        title={"How many books do you want to buy?"}
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Price: {price}VND</p>
        <input type="number" onChange={handleChange} />
        <p>Total price: {totalPrice}</p>
      </Modal>
    </div>
  );
};
export default ModalBuy;
