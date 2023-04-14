import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper";
import "./top-singers.css";

const TopSingers = ({ topSingers }) => {
  const navigate = useNavigate();

  return (
    <div>
      <p className="title">Топ виконавці</p>
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        navigation
        modules={[Navigation]}
      >
        {topSingers.map((topSinger) => (
          <SwiperSlide
            key={topSinger.id}
            className="top-singer"
            onClick={() => navigate(`/singer/${topSinger.id}`)}
          >
            <img
              src={topSinger.img}
              alt={topSinger.title}
              className="singer-img"
            />
            <p className="singer-name">{topSinger.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopSingers;
