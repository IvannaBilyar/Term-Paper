import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import LogoIcon from "../../assets/logo.svg";
import { getUser } from "../../api/auth";

import LeftMenu from "../left-menu";

import "./layout.css";
import MobileMenu from "./mobile-menu";
import DropdownButton from "./dropdown";
import Search from "./search";
import { useAuth } from "../../utils/auth-context";
import { useSearch } from "../../utils/search-context";

const Layout = () => {
  const { onOpen } = useSearch();
  const { onSetUser, email } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(email).then((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [email]);

  const handleRemoveUser = () => {
    setUser(null);
    onSetUser(null);
  };

  return (
    <div>
      <div className="inner-wrapper">
        <LeftMenu />
        <div className="full-width">
          <div className="top-bar">
            <div className="web-logo">
              <NavLink to="/">
                <img className={"logo"} src={LogoIcon} alt="logo" />
              </NavLink>
            </div>
            <div className="web-search" onClick={onOpen}>
              <Search />
            </div>

            <div className="layout-dropdown-btn">
              <DropdownButton
                user={user}
                isLoading={isLoading}
                onRemoveUser={handleRemoveUser}
              />
            </div>
            <MobileMenu user={user} isLoading={isLoading} />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
