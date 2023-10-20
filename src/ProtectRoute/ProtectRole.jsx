import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PageNotFound from "../pages/utility/PageNotFound";

function ProtectedRole({ children }) {
  let {  user } = useSelector((state) => state.auth);

  if (user?.role == "dean") {
    return <>{children}</>;
  } else {
   
    return <PageNotFound/>;
  }
}

export default ProtectedRole;
