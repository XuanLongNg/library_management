import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Select,
  Upload,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Style from "./style";
import axios from "axios";
import FirebaseConfig from "../../configs/firebaseConfig";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { URL_BASE } from "../../constants";

const firebaseConfig = new FirebaseConfig();
const image_default =
  "https://firebasestorage.googleapis.com/v0/b/quiz-d364f.appspot.com/o/default-thumbnail.jpg?alt=media&token=574f86da-559e-4a5d-a074-2b80bc211553&_gl=1*13sbxxd*_ga*MzczNDAyOTQ5LjE2ODA4ODU2OTU.*_ga_CW55HF8NVT*MTY4NTUzNzU4OS42NC4xLjE2ODU1Mzc4NDQuMC4wLjA.";
const BookView = () => {
  const { id, action } = useParams();
  const actionVariable = action === "view" ? "edit" : action;
  const [actionApi, setActionApi] = useState(actionVariable);
  const formRef = useRef();
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();
  const [imageUrl, setImageUrl] = useState(image_default);

  const defaultBookInformation = {
    id: "unknown",
    title: "unknown",
    author: "unknown",
    description: "unknown",
    nop: 0,
    category: "unknown",
    image: image_default,
    release_date: moment(new Date(), "YYYY/MM/DD"),
  };
  const [bookInformation, setBookInformation] = useState(
    defaultBookInformation
  );
  useEffect(() => {
    if (id === 0) return;
    const getBookInformation = async () => {
      const url = URL_BASE + "/api/user/getBook/" + id;
      const response = await axios.get(url);
      const data = response.data;
      data.release_date = moment(data.release_date, "YYYY/MM/DD");
      formRef.current?.setFieldsValue(data);
      setImage(data.image);
      console.log("Log UseEffect", data);
      setBookInformation(data);
      console.log("Image", data.image);
    };
    getBookInformation();
    console.log("Log Book effect", bookInformation);
    console.log("Use Effect");
  }, []);

  const handleFileUpload = (file) => {
    console.log("Handle file upload");

    setImageFile(file);
  };
  const handleFileChange = (files) => {
    const file = files;
    console.log("Handle file change");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage("");
    }
  };
  const handleApi = async (id, dataTmp, url, action) => {
    if (!dataTmp.release_date) dataTmp.release_date = new Date().toString();
    const data = {
      id: id,
      title: dataTmp.title,
      author: dataTmp.author,
      description: dataTmp.description,
      nop: dataTmp.nop,
      release_date: moment(dataTmp.release_date.$d).format("YYYY-MM-DD"),
      category: dataTmp.category,
      image: url,
    };
    try {
      const url_api = URL_BASE + "/api/user/" + action;
      const response = await axios.post(url_api, data);
      const message = response.data.message;
      if (message === "Success") {
        notification.success({ message: "Success" });
      } else {
        notification.error({ message: "Error" });
      }
    } catch (err) {
      console.log("Error: " + err);
      throw err;
    }
  };
  const handleSubmit = async () => {
    console.log("Handle file submit");

    const form = formRef.current;
    const values = form.getFieldsValue();
    const action = actionApi === "new" ? "addBook" : "updateBook";
    console.log("Submit", values);
    if (!imageFile) {
      // console.log(id, values, imageUrl, dzz);
      await handleApi(id, values, imageUrl, action);
      return;
    }
    const uniqueFilename = `${uuidv4()}_${imageFile.name}`;
    const storageRef = ref(firebaseConfig.getStorage(), uniqueFilename);
    const metadata = {
      contentType: "image/jpeg",
    };
    const snapshot = await uploadBytes(storageRef, imageFile, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    await handleApi(id, values, downloadURL, action);
  };
  return (
    <Style>
      <h1 className="header d-flex justify-content-center">Book</h1>
      <div className="container-content">
        <div className="d-flex ">
          <div className="form-container">
            <Form
              ref={formRef}
              // form={form}
              layout="vertical"
              // initialValues={bookInformation}
            >
              <Col>
                <Row>
                  <Form.Item
                    label="Title"
                    className="input-left"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input title!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Author"
                    className="input-right"
                    name="author"
                    rules={[
                      {
                        required: true,
                        message: "Please input author!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Row>
                <Form.Item label="Description" name="description">
                  <TextArea rows={4} />
                </Form.Item>
                <Row>
                  <Form.Item
                    label="Release date"
                    className="input-left"
                    name="release_date"
                    rules={[
                      {
                        required: true,
                        message: "Please input release date!",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      format={"YYYY/MM/DD"}
                    />
                  </Form.Item>
                  <Form.Item
                    className="input-right"
                    label="Number of pages"
                    name="nop"
                  >
                    <Input type="number" />
                  </Form.Item>
                </Row>
                <Form.Item label="Category" name="category">
                  <Select>
                    <Select.Option value="Novel">Novel</Select.Option>
                    <Select.Option value="Supernatural">
                      Supernatural
                    </Select.Option>
                    <Select.Option value="Romantic">Romantic</Select.Option>
                    <Select.Option value="Drama">Drama</Select.Option>
                    <Select.Option value="Detective">Detective</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Form>
          </div>
          <div className="image-container d-flex flex-column justify-content-center align-items-center">
            <Upload
              className="btn-upload"
              maxCount={1}
              beforeUpload={(file) => {
                handleFileUpload(file);
                handleFileChange(file);
                return false; // Prevent automatic upload
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <Image
              className="image"
              width={300}
              height={300}
              // preview={false}
              // fallback="https://firebasestorage.googleapis.com/v0/b/quiz-d364f.appspot.com/o/default-thumbnail.jpg?alt=media&token=574f86da-559e-4a5d-a074-2b80bc211553&_gl=1*13sbxxd*_ga*MzczNDAyOTQ5LjE2ODA4ODU2OTU.*_ga_CW55HF8NVT*MTY4NTUzNzU4OS42NC4xLjE2ODU1Mzc4NDQuMC4wLjA."
              src={image}
            />
          </div>
        </div>
        <div className="divider-container">
          <Divider className="divider" />
        </div>
        <div className="d-flex flex-row-reverse container-btn">
          <Button
            className="btn-action"
            type="primary"
            danger
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            className="btn-action"
            type="primary"
            disabled={actionApi === "edit" ? true : false}
          >
            Add
          </Button>
          <Button
            className="btn-action"
            type="primary"
            disabled={actionApi === "new" ? true : false}
          >
            Edit
          </Button>
        </div>
      </div>
    </Style>
  );
};
export default BookView;
