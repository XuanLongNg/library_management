import {
  PlusOutlined,
  RollbackOutlined,
  StarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Image, Modal, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Style from "./style";
import axios from "axios";
import moment from "moment";
import { URL_BASE } from "../../../constants";
import ModalBuy from "./components/modalBuy/modalBuy";
import ModalRent from "./components/modalRent/modalRent";

const BookUserView = () => {
  const { id } = useParams();
  const [bookInformation, setBookInformation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const getBookInformation = async () => {
      const url = URL_BASE + "/api/user/getBook/" + id;
      const response = await axios.get(url);
      const data = response.data;
      data.release_date = moment(data.release_date, "YYYY/MM/DD");
      console.log("Log UseEffect", data);
      setBookInformation(data);
      console.log("Image", data.image);
    };
    getBookInformation();
    console.log("Log Book effect", bookInformation);
    console.log("Use Effect");
    setIsLoading(false);
  }, []);

  const [isModalBuyBookOpen, setIsModalBuyBookOpen] = useState(false);
  const showModalBuyBook = () => {
    setIsModalBuyBookOpen(true);
  };

  const handleBuyBookOk = () => {
    setIsModalBuyBookOpen(false);
  };

  const handleBuyBookCancel = () => {
    setIsModalBuyBookOpen(false);
  };
  const [isModalRentBookOpen, setIsModalRentBookOpen] = useState(false);
  const showModalRentBook = () => {
    setIsModalRentBookOpen(true);
  };

  const handleRentBookOk = () => {
    setIsModalRentBookOpen(false);
  };

  const handleRentBookCancel = () => {
    setIsModalRentBookOpen(false);
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <Style>
      {/* <h1 className="header d-flex justify-content-center">Book View</h1> */}
      <Button
        type="primary"
        icon={<RollbackOutlined />}
        onClick={() => {
          window.location.href = "/books";
        }}
      >
        Back to list
      </Button>
      <div className="container-content">
        <div className="d-flex ">
          <div className="image-container d-flex flex-column justify-content-center align-items-center">
            <Image
              className="image"
              height={"400px"}
              src={bookInformation?.image}
            />
          </div>
          <div>
            <h3>{bookInformation?.title}</h3>
            <p>Author: {bookInformation?.author}</p>
            <p>Number of pages: {bookInformation?.nop}</p>
            <p>Release: {bookInformation?.release_date._i}</p>
            <Tag color="#2db7f5">{bookInformation?.category}</Tag>
            <p>
              4/5 <StarOutlined />
            </p>
            <p>Description: {bookInformation?.description}</p>
          </div>
        </div>
        {/* <div className="divider-container">
          <Divider className="divider" />
        </div> */}
        <div className="d-flex flex-row-reverse container-btn">
          <Button
            className="btn-action"
            type="primary"
            // danger
            onClick={() => showModalBuyBook()}
          >
            Buy
          </Button>

          <Button
            className="btn-action"
            type="primary"
            onClick={() => showModalRentBook()}
          >
            Rent
          </Button>

          {/* <Modal
            title={"How many books do you want to buy?"}
            open={isModalBuyBookOpen}
            onOk={handleBuyBookOk}
            onCancel={handleBuyBookCancel}
          /> */}
          {/* <Modal
            title={"How many days do you want to rent?"}
            open={isModalRentBookOpen}
            onOk={handleRentBookOk}
            onCancel={handleRentBookCancel}
          /> */}
          <ModalBuy
            isModalOpen={isModalBuyBookOpen}
            setIsModalOpen={setIsModalBuyBookOpen}
          />
          <ModalRent
            isModalOpen={isModalRentBookOpen}
            setIsModalOpen={setIsModalRentBookOpen}
          />
          {/* </Modal> */}
        </div>
      </div>
    </Style>
  );
};
export default BookUserView;
