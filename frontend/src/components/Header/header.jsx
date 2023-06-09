import { Button, Layout, Space } from "antd";
import { Link, animateScroll as scroll } from "react-scroll";
import Style from "./style";
import { useEffect, useState } from "react";
import Logout from "../../utils/logout";
import AuthBtn from "./components/auth_btn/AuthBtn";
import UserArea from "./components/UserArea/userArea";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("id"));
  console.log(
    "Cookie1 ",
    localStorage.getItem("id"),
    "\n",
    !!localStorage.getItem("id")
  );
  return (
    <Style className="d-flex justify-content-center">
      <div className="header">
        <ul className="d-flex list-header" style={{ listStyleType: "none" }}>
          <li className="item-nav">
            <a className="item-nav-a" href="/">
              Home
            </a>
          </li>
          <li className="item-nav">
            <a className="item-nav-a" href="/books">
              Library
            </a>
          </li>
          {!isLoggedIn && <AuthBtn />}
          {isLoggedIn && <UserArea setIsLoggedIn={setIsLoggedIn} />}
        </ul>
      </div>
    </Style>
  );
};
export default Header;
