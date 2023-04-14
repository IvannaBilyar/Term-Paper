import { useRef, useState } from "react";
import { Tooltip, Overlay, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import LogoIcon from "../../assets/logo.svg";
import LiIcon from "../../assets/li-icon1.svg";
import LiIcon2 from "../../assets/li-icon2.svg";

import "./left-menu.css";
import { useAuth } from "../../utils/auth-context";

const LeftMenu = () => {
  const { onOpen, email } = useAuth();
  const [show, setShow] = useState(false);
  const target = useRef();

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Overlay
        target={target.current}
        show={!email && show}
        placement="right"
        rootClose
        onHide={handleClose}
      >
        {(props) => (
          <Tooltip id="overlay-example" {...props} className="overlay">
            <p className="tooltip-text">
              Увійдіть, щоб переглянути збережені пісні, плейлисти в розділі
              “Моя бібліотека”.
            </p>
            <div className="tooltip-btns">
              <Button className="tooltip-later-btn" onClick={handleClose}>
                Не зараз
              </Button>
              <Button className="tooltip-login-btn" onClick={onOpen}>
                Увійти
              </Button>
            </div>
          </Tooltip>
        )}
      </Overlay>
      <div className="left-menu">
        <NavLink to="/">
          <img className={"logo"} src={LogoIcon} alt="logo" />
        </NavLink>
        <div className="menu-items">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `menu-item ${isActive ? "menu-item-active" : ""}`
            }
          >
            <img src={LiIcon} alt="main page" className="menu-item-icon" />
            <p className={"menu-item-text"}>Головна</p>
          </NavLink>
          <NavLink
            to={"/library"}
            ref={target}
            onMouseEnter={handleShow}
            className={({ isActive }) =>
              `menu-item ${isActive ? "menu-item-active" : ""}`
            }
          >
            <img src={LiIcon2} alt="my library" className="menu-item-icon" />
            <p className={"menu-item-text"}>Моя бібліотека</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default LeftMenu;
