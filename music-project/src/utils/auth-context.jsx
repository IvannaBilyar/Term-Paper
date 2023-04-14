import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isOpen: false,
  email: "",
  onClose: () => {},
  onOpen: () => {},
  onSetUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSetUser = (email) => {
    setEmail(email);
  };

  return (
    <AuthContext.Provider
      value={{
        isOpen,
        onClose: handleClose,
        onOpen: handleOpen,
        email,
        onSetUser: handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
