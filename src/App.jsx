import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Routes,
  Route,
  useLocation,
  RouterProvider,
} from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
// Import pages
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector, Provider } from "react-redux";
import { getUser } from "./Redux/reducers/authSlice";
import {
  getDepartments,
  getLeaves,
  getUsers,
} from "./Redux/reducers/dataSlice";
import { getInstructors, getSpecializations } from "./Redux/reducers/dataSlice";
import { router } from "./Router";

// "@vitejs/plugin-react": "^2.0.0",
// "vite": "^3.0.0"

function App() {
  const { user, isLoading, isAuth } = useSelector((state) => state.auth);
  const { departmentList, instructorList } = useSelector(
    (state) => state.deptData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getDepartments());
    dispatch(getInstructors());
    dispatch(getSpecializations());
    dispatch(getLeaves());
    dispatch(getUsers());
  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
