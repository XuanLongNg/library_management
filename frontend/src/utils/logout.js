import { message, notification } from "antd";

const Logout = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("username");
  localStorage.removeItem("email");

  notification.success({
    message: "Logged out",
    description: "You will return on home page.",
  });
  setTimeout(() => {
    window.location.href = "/";
  }, 3000);
};
export default Logout;
