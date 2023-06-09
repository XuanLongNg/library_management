import { Button } from "antd";
import Style from "./style";

const HomePage = () => {
  return (
    <Style>
      <Button
        type="primary"
        className="btn-start d-flex justify-content-center align-items-center"
        onClick={() => {
          window.location.href = "/books";
        }}
      >
        Start
      </Button>
    </Style>
  );
};
export default HomePage;
