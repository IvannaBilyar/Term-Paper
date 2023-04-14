import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import { getSinger, getSingerSongs } from "../../api/singer";

import "./singer.css";
import Song from "../../components/song/song";
import { useSong } from "../../utils/song-context";

const Singer = () => {
  const [singer, setSinger] = useState(null);
  const [songs, setSongs] = useState(null);
  const { onSelect, selectedSong } = useSong();
  const { singerId } = useParams();

  useEffect(() => {
    getSinger(singerId).then((data) => {
      if (data) {
        setSinger(data);
      }
    });
    getSingerSongs(singerId).then((data) => {
      if (data) {
        setSongs(data);
      }
    });
  }, [singerId]);

  return (
    <div className="mt-4">
      <div className="singer-top">
        <div>
          <p className="singer-top-title">Виконавець</p>
          <p className="singer-top-name">{singer?.title}</p>
          <img src={singer?.img} alt="singer" className="singer-top-image" />
        </div>
        <div>
          <p className="singer-top-title mb-4">Пісні</p>
          <div className="singer-songs-wrapper custom-scroll">
            {songs?.map((song, index) => (
              <Song
                song={song}
                index={index}
                key={song.id}
                smallPadding
                onSelect={onSelect}
                isSelected={song.key && selectedSong?.key === song.key}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="singer-bottom mt-5">
        <p className="singer-top-title mb-3">Рекомендації для вас</p>
        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          navigation
          modules={[Navigation]}
        >
          {singer?.recommendations?.map((recommendation) => (
            <SwiperSlide
              key={recommendation.id}
              className="recommendation"
              onClick={() => onSelect(recommendation)}
            >
              <img
                src={recommendation.img}
                alt="song"
                className="recommendation-img"
              />
              <p className="recommendation-name">{recommendation.name}</p>
              <p className="recommendation-singer">{recommendation.singer}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Singer;
