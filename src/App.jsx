import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
// Import pages
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./Redux/reducers/authSlice";
import {
  getDepartments,
  getLeaves,
  getUsers,
  getInstructors,
  getSpecializations,
} from "./Redux/reducers/dataSlice";
import { router } from "./Router";
import Cookie from "js-cookie";
import { ToastContainer } from "react-toastify";

// "@vitejs/plugin-react": "^2.0.0",
// "vite": "^3.0.0"

function App() {
  const { user, isLoading, isAuth } = useSelector((state) => state.auth);
  const { departmentList, instructorList } = useSelector(
    (state) => state.deptData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // if (!user) {
    dispatch(getUser());
    // }
    dispatch(getDepartments());
    dispatch(getInstructors());
    dispatch(getSpecializations());
    dispatch(getLeaves());
    dispatch(getUsers());
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
