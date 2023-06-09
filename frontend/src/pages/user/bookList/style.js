import styled from "styled-components";
import colors from "../../../styles/color/color";

const Style = styled.div`
  padding: 5em 4em;
  background-color: ${colors.black_blue_color};
  .list-card {
    .container-card {
      height: 40vh;
      width: 5em;
      text-decoration: none;
      .card {
        width: 13em;
        height: 40vh;
        /* background:  */
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
          .star {
            margin-right: 1em;
            .icon-img {
              margin: 0 0.5em 0 0;
            }
            .content-icon {
              margin: 0 1em 0 0;
            }
          }
        }
      }
      .card:hover {
        .content {
          height: 100%;
        }
      }
    }
    .ant-pagination-item-link {
      color: white;
    }
    .dropdown-content {
      max-width: 300px;
    }
  }
`;
export default Style;
