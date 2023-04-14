import { Form, InputGroup } from "react-bootstrap";
import SearchIcon from "../../../assets/search-icon.svg";

const Search = ({ value, onChange }) => {
  return (
    <InputGroup className="layout-input-wrapper">
      <img src={SearchIcon} alt="search" className="layout-input-icon" />
      <Form.Control
        placeholder="Пошук за виконавцем, піснею..."
        className="layout-input"
        onChange={onChange}
        value={value}
      />
    </InputGroup>
  );
};

export default Search;
