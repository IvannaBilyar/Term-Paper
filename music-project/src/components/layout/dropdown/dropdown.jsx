import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import Gear from "../../../assets/gear.svg";
import LoginIcon from "../../../assets/login.svg";
import DropdownArrow from "../../../assets/dropdown-arrow.svg";
import { useAuth } from "../../../utils/auth-context";

const DropdownButton = ({ user, isLoading, onRemoveUser }) => {
  const { onOpen } = useAuth();
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (toggled) => {
    setIsToggled(toggled);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    onRemoveUser();
    navigate("/");
  };
  return (
    <>
      {!user && (
        <Button className="layout-btn" onClick={onOpen}>
          <img src={LoginIcon} alt="Login" />
          {isLoading ? "Loading..." : "Увійти"}
        </Button>
      )}
      {user && (
        <Dropdown onToggle={handleToggle}>
          <Dropdown.Toggle
            className="layout-btn dropdown-toggle"
            id="dropdown-basic"
          >
            <img src={LoginIcon} alt="Login" />
            {user.name}
            <img
              src={DropdownArrow}
              alt="arrow"
              className={`${isToggled ? "arrow-up" : "arrow-down"}`}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item className="dropdown-menu-item">Акаунт</Dropdown.Item>
            <Dropdown.Item className="dropdown-menu-item">
              Профіль
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-menu-item">
              Завантажити
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-menu-item gear-menu-item">
              Налаштування
              <img src={Gear} alt="gear" />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              className="dropdown-menu-item"
              onClick={handleLogout}
            >
              Вихід
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default DropdownButton;
