import { useEffect, useState } from "react";
import { getTopSingers } from "../../api/top-singers";
import TopSingers from "./top-singers";
import { getTopHits } from "../../api/top-hits";
import TopHits from "./top-hits/top-hits";
import { useSong } from "../../utils/song-context";

const Home = () => {
  const [topSingers, setTopSingers] = useState([]);
  const [topHits, setTopHits] = useState([]);
  const { onInitList } = useSong();

  useEffect(() => {
    getTopSingers().then((data) => {
      data && setTopSingers(data);
    });

    getTopHits().then((data) => {
      if (data) {
        const mappedData = data.map((item) => item.allSongs);
        setTopHits(mappedData);
        onInitList(mappedData);
      }
    });
  }, []);

  return (
    <div>
      <TopSingers topSingers={topSingers} />
      <TopHits topHits={topHits} />
    </div>
  );
};

export default Home;
