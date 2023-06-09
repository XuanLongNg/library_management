import React, { useEffect } from "react";

import { Avatar, Button, Dropdown } from "antd";
import { URL_BASE } from "../../../../constants";
import axios from "axios";
import Logout from "../../../../utils/logout";

const UserArea = (props) => {
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" href="/user/view">
          Information
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" href="/history/purchase">
          Purchase history
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            props.setIsLoggedIn(false);
            console.log("Cookies:", localStorage.id);
            Logout();
          }}
        >
          Logout
        </div>
      ),
    },
  ];
  useEffect(() => {
    const getUser = async () => {
      try {
        const url = URL_BASE + "/api/user/getUser/" + localStorage.id;
        console.log(url);

        // const response = await axios.get(url);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  });
  return (
    <li className="flex-grow-1 d-flex flex-row-reverse align-items-center user-area">
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <Avatar
          size="large"
          src={
            "https://firebasestorage.googleapis.com/v0/b/library-management-c6238.appspot.com/o/d97d5214-82a1-44b3-81a8-ac1d9c908994_beluga.jpg?alt=media&token=8e309d27-5b1f-4bb2-b7ae-a4d0f4ad0d7a&_gl=1*12opo6v*_ga*MzczNDAyOTQ5LjE2ODA4ODU2OTU.*_ga_CW55HF8NVT*MTY4NjI4NzQ4MC42Ny4xLjE2ODYyODc1MTkuMC4wLjA."
          }
        />
      </Dropdown>
    </li>
  );
};

export default UserArea;
