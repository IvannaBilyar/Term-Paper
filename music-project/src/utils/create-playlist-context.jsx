import { createContext, useContext, useState } from "react";

const CreatePlaylistContext = createContext({
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
});

export const CreatePlaylistProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <CreatePlaylistContext.Provider
      value={{ isOpen, onClose: handleClose, onOpen: handleOpen }}
    >
      {children}
    </CreatePlaylistContext.Provider>
  );
};

export const useCreatePlaylist = () => {
  return useContext(CreatePlaylistContext);
};
