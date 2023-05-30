import React, { useState } from "react";
import { Button, Form, Input, notification, Divider } from "antd";
import Style from "./style";
import axios from "axios";
import { URL_BASE } from "../../constants";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    // setIsRegisted(false);
    setLoading(true);
    const data = {
      username: values.username,
      password: values.password,
      name: values.name,
      email: values.email,
      role: "user",
    };

    const url_api = URL_BASE + "/api/user/register";
    axios
      .post(url_api, data)
      .then((response) => {
        const message = response.data.message;
        if (message === "User exits") {
          notification.error({ message: "User exits" });
          setLoading(false);
        } else {
          notification.success({
            message: "Completed",
            description: "You will return to the login page in 3 seconds",
          });
          setTimeout(() => {
            setLoading(false);
            window.location.href = "/login";
          }, 3000);
          //   setIsRegisted(true);
        }
        console.log(message);
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: "Server error",
        });
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Style>
      <div className="container">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item className="container-header d-flex justify-content-center align-items-center">
            <h1>Register</h1>
          </Form.Item>
          <Form.Item
            className="input"
            label={<span style={{ color: "#fff" }}>Username</span>}
            name="username"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input your username!" }]}
            colon={false}
            required={false}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="input"
            label={<span style={{ color: "#fff" }}>Password</span>}
            name="password"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input your password!" }]}
            colon={false}
            required={false}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className="input"
            label={<span style={{ color: "#fff" }}>Name</span>}
            name="name"
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            colon={false}
            required={false}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="input"
            label={<span style={{ color: "#fff" }}>Email</span>}
            name="email"
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            colon={false}
            required={false}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              className="btn"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Divider style={{ borderColor: "white", color: "white" }}>
              or
            </Divider>
            <a href="/login">
              <Button className="btn" type="primary">
                Login
              </Button>
            </a>
          </Form.Item>
        </Form>
      </div>
    </Style>
  );
};

export default Register;
