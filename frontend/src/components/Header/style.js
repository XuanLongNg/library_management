import styled from "styled-components";
import { Layout } from "antd";
import colors from "../../styles/color/color";
const { Header } = Layout;
const Style = styled(Header)`
  background-color: ${colors.black_blue_color};
  color: ${colors.white};
  .header {
    width: 100%;
    .list-header {
      background-color: ${colors.black_blue_color};
      color: ${colors.white};
      list-style-type: none;
      box-shadow: 0px 0px 7px;
      padding: 0;
      height: 5em;
      .item-nav {
        width: 5em;
        font-size: 20px;
        margin-left: 2em;
        .item-nav-a {
          color: ${colors.white};
          text-decoration: none;
          text-transform: uppercase;
          &:hover {
            color: ${colors.main_btn_color};
          }
        }
      }
      .user-area {
        padding-right: 2em;
      }
      .btn-auth {
        float: right;
      }
    }
  }
`;
export default Style;
