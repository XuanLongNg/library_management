import styled from "styled-components";
import Image from "../../assets";
import colors from "../../styles/color/color";

const Style = styled.div`
  height: 90vh;
  background: ${colors.main_bg_color}
    url("https://anhdepfree.com/wp-content/uploads/2022/10/anh-nen-ke-sach-co-kinh_60141914464.jpg")
    no-repeat center/cover;
  position: relative;
  color: ${colors.main_text_color};
  .btn-start {
    position: absolute;
    bottom: 10em;
    right: 50%;
    transform: translateX(50%);
    width: 15em;
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    text-transform: uppercase;
    font-weight: bold;
    height: 3em;
    letter-spacing: 4px;
    font-size: 15px;
    box-shadow: 0 0 10px black inset;
    border: none;
  }
`;
export default Style;
