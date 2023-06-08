import styled from "styled-components";

const Style = styled.div`
  width: 80%;
  margin: 5em auto;
  .header {
    margin: 1em 0 1em;
  }
  .container-content {
    background-color: gray;
    border-radius: 10px;
    padding: 1em;
    .form-container {
      width: 50%;
      margin: 0 1em;
      .input-left {
        margin: 0 4% 0 0;
        width: 48%;
      }
      .input-right {
        /* margin: 0 1em 0 0; */
        width: 48%;
      }
    }
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
    .divider-container {
      width: 80%;
      margin: auto;
      .divider {
        margin-top: 0;
        border-color: white;
      }
    }
    .container-btn {
      .btn-action {
        margin: 0 1em;
      }
    }
  }
`;
export default Style;
