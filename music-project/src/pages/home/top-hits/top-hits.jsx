import "./top-hits.css";

import Song from "../../../components/song";
import { useSong } from "../../../utils/song-context";

const TopHits = ({ topHits }) => {
  const { onSelect, selectedSong } = useSong();

  return (
    <div>
      <p className="top-hit-title">Топ хіти</p>
      <div className="top-hits custom-scroll">
        {topHits.map((topHit, index) => (
          <Song
            song={topHit}
            index={index}
            key={topHit.id}
            onSelect={onSelect}
            isSelected={topHit.key && selectedSong?.key === topHit.key}
          />
        ))}
      </div>
    </div>
  );
};

export default TopHits;
