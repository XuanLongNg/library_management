import styled from "styled-components";

const Style = styled.div`
  padding: 1em;
  margin-top: 5em;
  .list-card {
    .container-card {
      height: 40vh;
      width: 5em;
      text-decoration: none;
      .card {
        width: 13em;
        height: 40vh;
        background: no-repeat center/cover;
        position: relative;
        .content {
          width: 100%;
          color: white;
          position: absolute;
          bottom: 0;
          padding: 1em;
          height: 50%;
          transition: height 0.5s ease;
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
          .title {
            font-size: 18px;
            overflow: hidden;
            height: 1.5em;
            margin: 0;
          }
          .author {
            margin: 4px 0;
          }
        }
      }
      .card:hover {
        .content {
          height: 100%;
        }
      }
    }
  }
`;
export default Style;
