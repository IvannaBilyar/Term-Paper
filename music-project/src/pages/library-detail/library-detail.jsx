import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getPlaylistById, removeFromPlaylist } from "../../api/playlist";
import "./library-detail.css";
import Song from "../../components/song";
import { useSong } from "../../utils/song-context";
import { getFavouritesSongs } from "../../api/songs";
import { getFavourites } from "../../utils/favourites";

const LibraryDetail = () => {
  const [playlist, setPlaylist] = useState();
  const [favouritesSongs, setFavouritesSongs] = useState([]);
  const { id } = useParams();
  const email = localStorage.getItem("userEmail");
  const { onSelect, selectedSong } = useSong();

  const isFavourite = id === "favourite";

  useEffect(() => {
    if (!isFavourite) {
      getPlaylistById(email, id).then((data) => {
        if (data) {
          setPlaylist(data);
        }
      });
    } else {
      const favourites = getFavourites();
      getFavouritesSongs(favourites).then((data) => {
        data && setFavouritesSongs(data);
      });
    }
  }, [isFavourite]);

  const handleDelete = (id) => {
    removeFromPlaylist(id).then(({ msg, success }) => {
      if (success) {
        toast(msg, {
          type: "success",
        });
        getPlaylistById(email, id).then((data) => {
          data && setPlaylist(data);
        });
      } else {
        toast(msg, { type: "error" });
      }
    });
  };

  const handleFavouritesChange = () => {
    getFavouritesSongs(getFavourites()).then((data) => {
      data && setFavouritesSongs(data);
    });
  };

  return (
    <div className="mt-3">
      <div className="library-detail-top">
        {isFavourite ? (
          <div className="library-detail-favourite">
            <div className="library-detail-favourite-inner" />
          </div>
        ) : (
          <div>
            {playlist && (
              <img
                src={
                  playlist.songs[0]?.songItem?.img ||
                  "https://demo.tutorialzine.com/2015/03/html5-music-player/assets/img/default.png"
                }
                className="library-detail-img"
                alt="playlist"
              />
            )}
          </div>
        )}
        <div>
          <p className="library-detail-top-title">
            {isFavourite ? "Пісні, що сподобалися" : playlist?.name}
          </p>
          <p className="library-detail-top-desc">
            {(isFavourite ? favouritesSongs.length : playlist?.songs?.length) ||
              0}{" "}
            пісень
          </p>
        </div>
      </div>
      <div className="library-detail-divider" />
      {isFavourite
        ? favouritesSongs.map((song, index) => (
            <Song
              key={song.id}
              song={song}
              index={index}
              onSelect={onSelect}
              isSelected={song.key && selectedSong?.key === song.key}
              onFavouritesChange={handleFavouritesChange}
            />
          ))
        : playlist?.songs?.map((songItem, index) => (
            <Song
              key={songItem.id}
              song={songItem.song}
              index={index}
              onDelete={() => handleDelete(songItem.id)}
              onSelect={onSelect}
              isSelected={
                songItem.song.key && selectedSong?.key === songItem.song.key
              }
            />
          ))}
    </div>
  );
};

export default LibraryDetail;
