import { useEffect, useRef, useState } from "react";
import { Tooltip, Overlay, Button } from "react-bootstrap";
import FavoriteIcon from "../../assets/favorite.svg";
import FavoriteFillIcon from "../../assets/favorite-fill.svg";
import AddIcon from "../../assets/plus.svg";
import DeleteIcon from "../../assets/delete.svg";
import { isFavourite, setFavourites } from "../../utils/favourites";
import { useAuth } from "../../utils/auth-context";

import "./song.css";
import { useAddToPlaylist } from "../../utils/add-to-playlist-context";
import { useSearch } from "../../utils/search-context";

const Song = ({
  song,
  index,
  onFavouritesChange,
  smallPadding,
  onSelect,
  isSelected,
  onDelete
}) => {
  const { isOpen } = useSearch();
  const { onOpen } = useAddToPlaylist();
  const [isSongFavourite, setIsSongFavourite] = useState(isFavourite(song.id));
  const { onOpen: onOpenAuth, email } = useAuth();
  const [show, setShow] = useState(false);
  const target = useRef();

  useEffect(() => {
    setIsSongFavourite(isFavourite(song.id));
  }, [isOpen]);

  const handleShow = (e) => {
    e.stopPropagation();
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleAuthOpen = () => {
    handleClose();
    onOpenAuth();
  };

  const handleClick = (e) => {
    onSelect(song);
  };

  const handleSetFavourite = (e) => {
    e.stopPropagation();
    setFavourites(song.id);
    setIsSongFavourite((prevFavourite) => !prevFavourite);
    onFavouritesChange && onFavouritesChange();
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    onOpen(song);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <>
      <Overlay
        target={target.current}
        show={!email && show}
        placement="bottom"
        rootClose
        onHide={handleClose}
      >
        {(props) => (
          <Tooltip id="overlay-example" {...props} className="overlay">
            <p className="tooltip-text">
              Увійдіть, щоб добавити пісню до плейлиста.
            </p>
            <div className="tooltip-btns">
              <Button className="tooltip-later-btn" onClick={handleClose}>
                Не зараз
              </Button>
              <Button className="tooltip-login-btn" onClick={handleAuthOpen}>
                Увійти
              </Button>
            </div>
          </Tooltip>
        )}
      </Overlay>
      <div
        key={song.id}
        className={`top-hit ${isSelected ? "top-hit-selected" : ""}`}
        onClick={handleClick}
      >
        <div className="top-hit-flex">
          <p className="top-hit-number">{index + 1}</p>
          <img src={song.img} alt={song.name} className="top-hit-img" />
        </div>
        <div className="top-hit-main-part">
          <p className="top-hit-name">{song.name}</p>
          <p className="top-hit-singer-name">{song.singer}</p>
        </div>

        <div className="top-hit-flex top-hit-right">
          <img
            src={isSongFavourite ? FavoriteFillIcon : FavoriteIcon}
            alt="favorite"
            className={`top-hit-favorite ${
              smallPadding ? "top-hit-favorite-small" : ""
            }`}
            onClick={handleSetFavourite}
          />
          {onDelete ? (
            <img
              src={DeleteIcon}
              alt="delete"
              className={`top-hit-favorite ${
                smallPadding ? "top-hit-favorite-small" : ""
              }`}
              onClick={handleDelete}
            />
          ) : (
            <img
              src={AddIcon}
              alt="plus"
              className={`top-hit-favorite ${
                smallPadding ? "top-hit-favorite-small" : ""
              }`}
              ref={target}
              onMouseEnter={handleShow}
              onClick={email ? handleAddToPlaylist : handleShow}
            />
          )}
          <p className="top-hit-duration">{song.duration}</p>
        </div>
      </div>
    </>
  );
};

export default Song;
