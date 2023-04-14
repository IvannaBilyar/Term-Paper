import { createContext, useContext, useState } from "react";

const SearchContext = createContext({
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
});

export const SearchProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        onClose: handleClose,
        onOpen: handleOpen
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
