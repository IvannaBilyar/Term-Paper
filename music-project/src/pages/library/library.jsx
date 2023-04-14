import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Favourites from "../../assets/favourites-white.svg";
import NewPlaylistImg from "../../assets/new-playlist.svg";
import { getFavourites } from "../../utils/favourites";

import "./library.css";
import { useEffect, useState } from "react";
import { getPlaylists } from "../../api/playlist";
import PlaylistItem from "./playlist-item";
import { useCreatePlaylist } from "../../utils/create-playlist-context";

const Library = () => {
  const { onOpen, isOpen } = useCreatePlaylist();
  const navigate = useNavigate();
  const favourites = getFavourites();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      getPlaylists(localStorage.getItem("userEmail")).then((data) => {
        data && setPlaylists(data);
      });
    }
  }, [isOpen]);

  const handleNavigateToFavourites = () => {
    navigate("/library/favourite");
  };

  return (
    <div>
      <p className="library-playlists-title">Плейлисти</p>
      <div className="library-playlists">
        <div
          className="library-favourites"
          onClick={handleNavigateToFavourites}
        >
          <div className="library-favourites-inner">
            <img
              src={Favourites}
              alt="favourites"
              className="library-favourites-heart"
            />
            <div className="library-favourites-content">
              <p className="library-favourites-title">Пісні, що сподобалися</p>
              <p className="library-favourites-text">
                {favourites.length} пісень, що сподобалися
              </p>
            </div>
          </div>
        </div>
        {playlists.map((playlistItem) => (
          <PlaylistItem key={playlistItem.id} item={playlistItem} />
        ))}
      </div>
      <div className="library-favourites-divider" />
      <Button className="new-playlist-btn" onClick={onOpen}>
        <img src={NewPlaylistImg} alt="new-playlist" />
        Новий плейлист
      </Button>
    </div>
  );
};

export default Library;
