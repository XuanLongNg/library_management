import styled from "styled-components";
import colors from "../../styles/color/color";

const Style = styled.div`
  background-color: ${colors.black_blue_color};
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    margin: 5em 0;
    background-color: ${colors.light_blue_color};
    /* height: 30em; */
    width: 22em;
    border-radius: 10px;
    padding: 2em;
    .container-header {
      margin-top: 3em;
      color: ${colors.white};
    }
    .input {
      width: 100%;
    }
    .btn {
      margin-top: 1em;
      width: 100%;
      background-color: ${colors.black_blue_color};
      color: ${colors.white};
      height: 2.5em;
    }
    .btn:hover {
      background-color: ${colors.white};
      color: ${colors.black_blue_color};
    }
  }
`;
export default Style;
