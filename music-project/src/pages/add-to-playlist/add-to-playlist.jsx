import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import "./add-to-playlist.css";
import { addToPlaylist, getPlaylists } from "../../api/playlist";
import { useAddToPlaylist } from "../../utils/add-to-playlist-context";
import { useCreatePlaylist } from "../../utils/create-playlist-context";

const AddToPlaylist = () => {
  const { onOpen, isOpen } = useCreatePlaylist();
  const { song, onClose } = useAddToPlaylist();
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      getPlaylists(localStorage.getItem("userEmail")).then((data) => {
        data && setPlaylists(data);
      });
    }
  }, [isOpen]);

  const handleChange = ({ target: { value } }) => {
    setPlaylist(value);
  };

  const handleClick = () => {
    if (playlist) {
      addToPlaylist({
        userId: localStorage.getItem("userEmail"),
        listId: playlist,
        song,
      }).then(({ msg, success }) => {
        if (success) {
          toast(msg, {
            type: "success",
          });
          setTimeout(() => {
            onClose();
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
    <Modal show={!!song} className="add-to-playlist-modal" centered>
      <Modal.Header
        closeButton
        className="add-to-playlist-header"
        onHide={onClose}
      />
      <div className="add-to-playlist-content">
        <p className="add-to-playlist-title">Додати до плейлиста</p>
        <div className="add-to-playlist-divider" />
        <Form.Select
          className="add-to-playlist-select mt-5"
          value={playlist}
          onChange={handleChange}
          name="playlist"
        >
          <option value={0}>Виберіть плейлист</option>
          {playlists.map((playlist) => (
            <option value={playlist.id} key={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </Form.Select>

        <Button className={"add-to-playlist-btn"} onClick={handleClick}>
          Додати
        </Button>
        <Button className={"create-playlist-btn"} onClick={onOpen}>
          Створити плейлист
        </Button>
      </div>
    </Modal>
  );
};

export default AddToPlaylist;
