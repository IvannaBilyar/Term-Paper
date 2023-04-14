import { useState } from "react";
import { NavLink } from "react-router-dom";

import LiIcon from "../../../assets/li-icon1.svg";
import LiIcon2 from "../../../assets/li-icon2.svg";

import "./mobile-menu.css";
import DropdownButton from "../dropdown";
import Search from "../search";
import { useSearch } from "../../../utils/search-context";

const MobileMenu = ({ user, isLoading }) => {
  const { onOpen } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleMobileMenu = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleSearchOpen = () => {
    setIsOpen(false);
    onOpen();
  };

  return (
    <>
      <div
        className={`hamburger-icon ${isOpen ? "hamburger-icon-open" : ""}`}
        onClick={handleToggleMobileMenu}
      >
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
      </div>
      <div
        className={`hamburger-menu-items  ${
          isOpen ? "hamburger-menu-items-open" : ""
        }`}
      >
        <div className="hamburger-menu-items-content">
          <DropdownButton user={user} isLoading={isLoading} />
          <div className="mobile-search" onClick={handleSearchOpen}>
            <Search />
          </div>
          <div className="hamburger-menu-divider" />

          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `mobile-menu-item menu-item ${isActive ? "menu-item-active" : ""}`
            }
            onClick={handleToggleMobileMenu}
          >
            <img src={LiIcon} alt="main page" className="menu-item-icon" />
            <p className={"menu-item-text"}>Головна</p>
          </NavLink>
          <NavLink
            to={"/library"}
            className={({ isActive }) =>
              `mobile-menu-item menu-item ${isActive ? "menu-item-active" : ""}`
            }
            onClick={handleToggleMobileMenu}
          >
            <img src={LiIcon2} alt="my library" className="menu-item-icon" />
            <p className={"menu-item-text"}>Моя бібліотека</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
