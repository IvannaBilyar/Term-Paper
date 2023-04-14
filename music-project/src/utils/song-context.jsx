import { createContext, useContext, useState } from "react";

const SongContext = createContext({
  selectedSong: null,
  onSelect: () => {},
  onClear: () => {},
  onInitList: () => {},
  onSetList: () => {},
  list: [],
  initList: [],
});

export const SongProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [list, setList] = useState([]);
  const [initList, setInitList] = useState([]);

  const handleSelect = (song) => {
    setSelectedSong(song);
  };

  const handleClear = () => {
    setSelectedSong(null);
  };

  const handleSetList = (songs) => {
    setList(songs);
  };

  const handleInitList = (songs) => {
    setInitList(songs);
    setList(songs);
  };

  return (
    <SongContext.Provider
      value={{
        selectedSong,
        onSelect: handleSelect,
        onClear: handleClear,
        onSetList: handleSetList,
        list,
        initList,
        onInitList: handleInitList,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
  return useContext(SongContext);
};
