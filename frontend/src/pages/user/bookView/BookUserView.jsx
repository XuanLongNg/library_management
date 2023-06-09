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
import ModalBuy from "./components/modalBuy/modalBuy";
import ModalRent from "./components/modalRent/modalRent";
import ModalPayment from "./components/modalPayment/ModalPayment";

const BookUserView = () => {
  const { id } = useParams();
  const [bookInformation, setBookInformation] = useState();
  const [item, setItem] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [day, setDay] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    const getBookInformation = async () => {
      const url = URL_BASE + "/api/user/getBook/" + id;
      const response = await axios.get(url);
      const data = response.data;
      data.release_date = moment(data.release_date).format("YYYY/MM/DD");
      console.log("Log UseEffect", data);
      setBookInformation(data);
      console.log("Image", data.image);
    };
    const getItem = async () => {
      const url = URL_BASE + "/api/user/getItem/" + id;
      const response = await axios.get(url);
      const data = response.data;
      setItem(data);
      console.log("Item", data);
    };
    const getFeedback = async () => {
      let url = URL_BASE + "/api/user/getFeedback/" + id;
      const response = await axios.get(url);
      const data = response.data;
      setData(data);
      console.log("Item", data);
    };
    getBookInformation();
    getItem();
    getFeedback();
    console.log("Log Book effect", bookInformation);
    console.log("Use Effect");
    setIsLoading(false);
  }, []);

  const [isModalBuyBookOpen, setIsModalBuyBookOpen] = useState(false);
  const showModalBuyBook = () => {
    setIsModalBuyBookOpen(true);
  };

  const [isModalRentBookOpen, setIsModalRentBookOpen] = useState(false);
  const showModalRentBook = () => {
    setIsModalRentBookOpen(true);
  };
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);

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
            window.location.href = "/books";
          }}
        >
          Back to list
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
              <p className="description">
                Description: {bookInformation?.description}
              </p>
            </div>
          </div>
          <div className="d-flex flex-row-reverse container-btn">
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
              Buy
            </Button>

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
                showModalRentBook();
              }}
            >
              Rent
            </Button>
            <ModalBuy
              price={item?.purchase_price}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              isModalOpen={isModalBuyBookOpen}
              setIsModalOpen={setIsModalBuyBookOpen}
              modalPayment={setIsModalPaymentOpen}
            />
            <ModalPayment
              day={day}
              totalPrice={totalPrice}
              modalBuy={setIsModalBuyBookOpen}
              modalRent={setIsModalRentBookOpen}
              isModalOpen={isModalPaymentOpen}
              setIsModalOpen={setIsModalPaymentOpen}
            />
            <ModalRent
              setDay={setDay}
              price={item?.rent_price}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              isModalOpen={isModalRentBookOpen}
              setIsModalOpen={setIsModalRentBookOpen}
              modalPayment={setIsModalPaymentOpen}
            />
          </div>
          <div className="container-feedback">
            <Divider className="divider-feedback" orientation="left">
              Feedback
            </Divider>
            <List
              className="list-feedback"
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/library-management-c6238.appspot.com/o/d97d5214-82a1-44b3-81a8-ac1d9c908994_beluga.jpg?alt=media&token=8e309d27-5b1f-4bb2-b7ae-a4d0f4ad0d7a&_gl=1*12opo6v*_ga*MzczNDAyOTQ5LjE2ODA4ODU2OTU.*_ga_CW55HF8NVT*MTY4NjI4NzQ4MC42Ny4xLjE2ODYyODc1MTkuMC4wLjA."
                        }
                        size="large"
                      />
                    }
                    title={
                      <div className="d-flex">
                        <p style={{ marginRight: "1em" }}>{item.name}</p>
                        <p style={{ color: "gray" }}>{item.time}</p>
                      </div>
                    }
                    description={item.comment}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </Style>
  );
};
export default BookUserView;
