import { useState } from "react";
import { Modal, Form, FloatingLabel, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import "./new-playlist.css";
import { createPlaylist } from "../../api/playlist";
import { useCreatePlaylist } from "../../utils/create-playlist-context";
import { validateMaxLength } from "../../utils/validate";

const NewPlaylist = () => {
  const { isOpen, onClose } = useCreatePlaylist();

  const [data, setData] = useState({
    name: "",
    errors: {
      name: "",
    },
  });

  const handleChange = ({ target: { name, value } }) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateName = () => {
    const isNameValid = validateMaxLength(data.name, 100, 2);

    setData((prevState) => ({
      ...prevState,
      errors: {
        name: isNameValid ? "" : "Назва повинна містити від 2 до 100 символів.",
      },
    }));

    return isNameValid;
  };

  const handleSubmit = () => {
    const isValid = validateName();
    if (isValid) {
      createPlaylist({
        userId: localStorage.getItem("userEmail"),
        name: data.name,
      }).then(({ success, msg }) => {
        if (success) {
          setTimeout(() => {
            onClose();
            setData({
              name: "",
              errors: {
                name: "",
              },
            });
          }, 1000);
        } else {
          toast(msg, {
            type: "error",
          });
        }
      });
    }
  };

  return (
    <Modal show={isOpen} className="new-playlist-modal" centered>
      <Modal.Header
        closeButton
        className="new-playlist-header"
        onHide={onClose}
      />
      <div className="new-playlist-content">
        <p className="new-playlist-title">Створити плейлист</p>
        <div className="new-playlist-divider" />
        <FloatingLabel
          controlId="new-playlist"
          label="Введіть назву"
          className="new-playlist-floating-label"
        >
          <Form.Control
            className="new-playlist-input mt-5"
            name="name"
            value={data.name}
            onChange={handleChange}
            isInvalid={data.errors.name}
          />
        </FloatingLabel>
        {data.errors.name && <p className="input-error">{data.errors.name}</p>}
        <Button className="new-playlist-button" onClick={handleSubmit}>
          Створити
        </Button>
      </div>
    </Modal>
  );
};

export default NewPlaylist;
