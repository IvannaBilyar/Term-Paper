import { useNavigate } from "react-router-dom";
import "./playlist-item.css";

import PlayIcon from "../../../assets/circled-play.svg";

const PlaylistItem = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/library/${item.id}`);
  };

  return (
    <div className="playlist-item-root" onClick={handleNavigate}>
      <img
        src={
          item.songs[0]?.songItem?.img ||
          "https://demo.tutorialzine.com/2015/03/html5-music-player/assets/img/default.png"
        }
        alt={item.name}
        className="playlist-item-img"
      />
      <p className="playlist-item-title">{item.name}</p>
      <img src={PlayIcon} alt="play" className="playlist-item-img-play" />
    </div>
  );
};

export default PlaylistItem;
