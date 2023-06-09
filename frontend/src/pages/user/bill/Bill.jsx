import {
  PlusOutlined,
  RollbackOutlined,
  StarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Image,
  List,
  Modal,
  Tag,
  notification,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Style from "./style";
import axios from "axios";
import moment from "moment";
import { URL_BASE } from "../../../constants";
// import ModalBuy from "./components/modalBuy/modalBuy";
// import ModalRent from "./components/modalRent/modalRent";
// import ModalPayment from "./components/modalPayment/ModalPayment";

const Bill = () => {
  const { id } = useParams();
  const [bookInformation, setBookInformation] = useState();
  const [item, setItem] = useState();
  const [bill, setBill] = useState({ id_item: 1 });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [day, setDay] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    const getBookInformation = async (id) => {
      const url = URL_BASE + "/api/user/getBook/" + id;
      const response = await axios.get(url);
      const data = response.data;
      data.release_date = moment(data.release_date).format("YYYY/MM/DD");
      console.log("Log UseEffect", data);
      setBookInformation(data);
      console.log("Image", data.image);
    };
    const getItem = async (id) => {
      const url = URL_BASE + "/api/user/getItem/" + id;
      const response = await axios.get(url);
      const data = response.data;
      setItem(data);
      console.log("Item", data);
    };
    const getBill = async () => {
      const url = URL_BASE + "/api/user/getBill/" + id;
      const response = await axios.get(url);
      const data = response.data;
      setBill(data);
      console.log("Item", data);
      await getBookInformation(data.id_item);
      await getItem(data.id_item);
    };
    getBill();
    console.log("Log Book effect", bookInformation);
    console.log("Use Effect");
    setIsLoading(false);
  }, []);
  const handleApi = async () => {
    try {
      const url = URL_BASE + "/api/user/createBill";
      const data = {
        id_user: localStorage.id,
        id_item: bill.id_item,
        time: bill.time,
        time_start:
          bill.money % item.rent_price == 0
            ? moment(new Date()).format("YYYY/MM/DD")
            : null,
        time_end:
          bill.money % item.rent_price == 0
            ? moment(new Date())
                .add(bill.money / item.rent_price, "days")
                .format("YYYY/MM/DD")
            : null,
        money: bill.money,
        status: "paid",
      };
      const response = await axios.post(url, data);
      if (response.data.message === "Success") {
        notification.success({
          message: "Success",
          description: "You will return history after 3s",
        });
        setTimeout(() => {
          window.location.href = "/history/purchase";
        }, 3000);
      } else {
        notification.error({ message: "Error" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModalBuyBook = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleApi();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <Style>
      <div className="container">
        <Button
          className="d-flex align-items-center"
          style={{ margin: "1em 0" }}
          type="primary"
          icon={<RollbackOutlined />}
          onClick={() => {
            window.location.href = "/history/purchase";
          }}
        >
          Back to history
        </Button>
        <div className="container-content">
          <div className="d-flex container-content-form">
            <div className="image-container d-flex flex-column justify-content-center align-items-center">
              <Image
                className="image"
                height={"400px"}
                src={bookInformation?.image}
              />
            </div>
            <div className="content">
              <h3 className="title">{bookInformation?.title}</h3>
              <p className="author">Author: {bookInformation?.author}</p>
              <p className="nop">Number of pages: {bookInformation?.nop}</p>
              <p className="release_date">
                Release: {bookInformation?.release_date}
              </p>
              <Tag className="category" color="#2db7f5">
                {bookInformation?.category}
              </Tag>
              <p className="d-flex align-items-center star-feedback">
                4/5 <StarOutlined />
              </p>
              <p className="description">Time: {bill?.time}</p>
              <p className="description">Status: {bill?.status}</p>
              <p className="description">Total price: {bill?.money}</p>
            </div>
          </div>
          <div className="d-flex flex-row-reverse container-btn">
            {bill.status == "unpaid" && (
              <Button
                className="btn-action"
                type="primary"
                onClick={() => {
                  if (!localStorage.id) {
                    notification.error({
                      message: "You must be logged in to use this feature",
                    });
                    return;
                  }
                  showModalBuyBook();
                }}
              >
                Purchase
              </Button>
            )}
            <Modal
              zIndex={100}
              title={"Are you sure to buy it??"}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Total price: {bill.money}</p>
            </Modal>
          </div>
        </div>
      </div>
    </Style>
  );
};
export default Bill;
