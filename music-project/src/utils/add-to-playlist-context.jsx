import { createContext, useContext, useState } from "react";

const AddToPlaylistContext = createContext({
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
});

export const AddToPlaylistProvider = ({ children }) => {
  const [song, setSong] = useState(null);

  const handleClose = () => {
    setSong(null);
  };

  const handleOpen = (song) => {
    setSong(song);
  };

  return (
    <AddToPlaylistContext.Provider
      value={{ song, onClose: handleClose, onOpen: handleOpen }}
    >
      {children}
    </AddToPlaylistContext.Provider>
  );
};

export const useAddToPlaylist = () => {
  return useContext(AddToPlaylistContext);
};
