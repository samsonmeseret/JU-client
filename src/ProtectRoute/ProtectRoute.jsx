import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PulseLoader from "../components/PulseLoader/PulseLoader";

function ProtectedRoutes({ children }) {
  let { isAuth, user, isLoading } = useSelector((state) => state.auth);

  let navigate = useNavigate();

  if (isAuth && user) {
    return <>{children}</>;
  } else {
    navigate("/signin");
    return null;
  }
}

export default ProtectedRoutes;
