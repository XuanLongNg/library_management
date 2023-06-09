import styled from "styled-components";
import colors from "../../../styles/color/color";

const Style = styled.div`
  margin: 0px;
  min-height: 90vh;
  background-color: ${colors.black_blue_color};
  padding: 6em 0 6em;
  .container {
    width: 80%;
    padding: 3em auto;
    background-color: ${colors.black_blue_color};

    .header {
      margin: 1em 0 1em;
    }
    .container-content {
      background-color: ${colors.white};
      border-radius: 10px;
      padding: 1em;
      .container-content-form {
        .image-container {
          margin: 0 1em;
          width: 40%;

          .btn-upload {
            width: 40%;
            margin-bottom: 1em;
          }
          .image {
            border-radius: 10px;
          }
        }
        .content {
          width: 60%;
          .title,
          .author,
          .release_date,
          .nop,
          .star-feedback {
            margin: 0;
          }
        }
      }

      .container-btn {
        .btn-action {
          margin: 0 1em;
        }
      }
      .container-feedback {
        padding: 3em;
        .divider-feedback {
          border-color: ${colors.black};
        }
      }
    }
  }
`;
export default Style;
