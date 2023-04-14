import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/auth-context";

const ProtectedRoute = ({ children }) => {
  const { onOpen, email } = useAuth();

  useEffect(() => {
    if (!email) {
      onOpen();
    }
  }, []);

  if (!email) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
