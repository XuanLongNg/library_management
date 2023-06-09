import styled from "styled-components";
import colors from "../../../../styles/color/color";

const Style = styled.li`
  .container-btn-auth {
    position: relative;
    width: 6em;
    .btn-signup,
    .btn-login {
      p {
        color: ${colors.white};
        text-decoration: none;
      }
      margin: auto 0;
      margin-right: 1em;
      border-radius: 20px;
      height: 2em;
      line-height: 2em;
      padding: 0 1em;
      transition: background-color 0.5s ease, box-shadow 0.5s ease;
      color: ${colors.white};
      text-decoration: none;
      position: absolute;
      background-color: ${colors.main_btn_color};
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .btn-signup {
      left: -90%;
      z-index: 5;
      width: 6.5em;
    }
    .btn-login {
      p {
        color: ${colors.black};
      }
      background-color: white;
      z-index: 4;
      width: 6em;
    }
    .btn-login:hover {
      background-color: ${colors.black_blue_color};
      p {
        color: ${colors.white};
      }
      box-shadow: 0 0 10px black inset;
    }
    .btn-signup:hover {
      background-color: ${colors.main_bg_color};
      p {
        color: ${colors.main_text_color};
      }
      box-shadow: 0 0 10px black inset;
    }
  }
`;
export default Style;
