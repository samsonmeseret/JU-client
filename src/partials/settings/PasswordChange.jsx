import React, { useState } from "react";
import useFetch from "../../customHooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import PulseLoader from "../../components/PulseLoader/PulseLoader";


const PasswordChange = () => {
  const [isLoading, setIsLoading] = useState(false);

  const closeAfter15 = () =>
    toast("Password Changed Successfully", { autoClose: 15000 });

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      passwordConfirm: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required("please enter the old password")
        .min(6, "Minimum Password is 6 Character"),
      newPassword: Yup.string()
        .min(6, "Minimum Password is 6 Character")
        .required("please enter your new password"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords is not match")
        .required("please enter your password Confirm")
        .min(6, "Minimum Password is 6 Character"),
    }),
    onSubmit: (values) => {
      // setIsLoading(true);
      console.log(values);

      axiosInstance
        .patch(`/me/updatePassword`, values)
        .then((data) => {
          formik.resetForm();
          setIsLoading(false);
          toast.success("🔑 your Password Changed Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })

        .catch((err) => {
          setIsLoading(false);
          toast.error("🔒 Password didn't Changed, check current your password ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(err)
        });
    },
  });

  return isLoading ? (
    <PulseLoader />
  ) : (
    <>
      <div>
        <Link
          to={"/dashboard/settings/account"}
          className="btn border-slate-200 flex gap-3 hover:border-slate-300 text-slate-600"
        >
          <BiArrowBack /> <button>Back </button>
        </Link>
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
        {/* <Link
        to={"/dashboard/settings/account"}
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
      >
        go Back
      </Link> */}
        <section className="p-5">
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
            Password
          </h2>
          <div className="text-sm">
            You can set a permanent password if you don't want to use temporary
            login codes.
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-5 ">
              <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="oldPassword"
                  >
                    Old Password
                  </label>
                  <input
                    id="oldPassword"
                    className="form-input w-full"
                    placeholder="*****************"
                    type="password"
                    //   autoComplete="on"
                    name="oldPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.oldPassword}
                    //   defaultValue={user.middleName}
                  />
                  {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <small className="text-red-600">
                      {formik.errors.oldPassword}
                    </small>
                  ) : null}
                </div>
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="newPassword"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    className="form-input w-full"
                    type="password"
                    //   autoComplete="on"
                    name="newPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    //   defaultValue={user.middleName}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <small className="text-red-600">
                      {formik.errors.newPassword}
                    </small>
                  ) : null}
                </div>
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="passwordConfirm"
                  >
                    Password Confirm
                  </label>
                  <input
                    id="passwordConfirm"
                    className="form-input w-full"
                    type="password"
                    // autoComplete="on"
                    name="passwordConfirm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                    //   defaultValue={user.middleName}
                  />
                  {formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm ? (
                    <small className="text-red-600">
                      {formik.errors.passwordConfirm}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-center mt-6">
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                  type="submit"
                >
                  {isLoading ? (
                    <CompLoader height={"20px"} color="#ffffff" />
                  ) : (
                    "Update Password "
                  )}
                </button>
              </div>
              {/* <button className="btn border-slate-200 shadow-sm text-indigo-500">
            Set New Password
          </button> */}
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default PasswordChange;
