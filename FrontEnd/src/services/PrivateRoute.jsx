import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const PrivateRoutes = () => {
  const { accessToken } = useContext(AuthContext);
  const location = useLocation();
  return accessToken ? (
    <Outlet />
  )
    : (
      <Navigate to={"/Auth?Login"} state={{ from: location }} replace />
    )
}
