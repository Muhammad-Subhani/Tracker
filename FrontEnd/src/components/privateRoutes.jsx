import { useContext } from "react";
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext.js"
export const PrivateRoutes = function({ children }) {
  const { accessToken, loading } = useContext(AuthContext);
  if (loading) {
    return <p>Loading....</p>
  }
  else if (accessToken == null) {
    return <Navigate to="/Auth/Login" replace />
  }
  return children;
}
