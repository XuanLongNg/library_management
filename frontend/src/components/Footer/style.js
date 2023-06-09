import styled from "styled-components";
import { Layout } from "antd";
import colors from "../../styles/color/color";

const { Footer } = Layout;
const Style = styled(Footer)`
  height: 30vh;
  background-color: ${colors.black_blue_color};
  color: ${colors.white};
  border-top: 1px solid ${colors.white};
  h5 {
    color: ${colors.main_btn_color};
  }
`;
export default Style;
