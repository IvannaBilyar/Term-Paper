import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSearch } from "../../utils/search-context";
import Search from "../../components/layout/search";

import DeleteIcon from "../../assets/delete.svg";

import "./search-overlay.css";
import { search } from "../../api/songs";
import Song from "../../components/song/song";
import { useSong } from "../../utils/song-context";

const SearchOverlay = () => {
  const { pathname } = useLocation();
  const singerId = pathname.includes("singer")
    ? pathname.split("/").at(-1)
    : undefined;
  const { isOpen, onClose } = useSearch();
  const { onSelect, onInitList } = useSong();
  const [songs, setSongs] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    search(value, singerId).then((songs) => {
      if (songs) {
        setSongs(songs);
        onInitList(songs);
      }
    });
  }, [value, isOpen]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (song) => {
    onSelect(song);
    onClose();
  };

  return (
    <div className="search-overlay" style={{ width: isOpen ? "100%" : "0%" }}>
      <div className="search-overlay-content">
        <div className="search-overlay-header">
          <Search value={value} onChange={handleChange} />
          <img
            src={DeleteIcon}
            alt="close"
            onClick={onClose}
            className="search-overlay-close"
          />
        </div>
        <div className="search-overlay-hits">
          {songs.map((song, index) => (
            <Song
              key={song.id}
              song={song}
              index={index}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
