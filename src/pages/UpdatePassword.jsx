import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthImage from "../components/Hero/jimmaPic.jpg";
import AuthDecoration from "../images/auth-decoration.png";
import blackLogo from "../components/Nav/Logo/main-logo-black.png";
import { endPoint } from "../api/api";
import axios from "axios";
import CompLoader from "../components/CompLoader";
import { useParams } from "react-router-dom";
import { Bars, MagnifyingGlass } from "react-loader-spinner";

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentErr, setContentErr] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [response, setResponse] = useState("");
  const [pass, setPass] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    setContentLoading(true);
    axios
      .get(`${endPoint.BASE_URL}${endPoint.CHECK_TOKEN}/${token}`)
      .then((data) => {
        console.log(data);
        if (data?.data.status == "fail") setContentErr(data?.data?.message);
        setContentLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setContentLoading(false);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Minimum Password is 6 Character")
        .required("please enter your new password"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords is not match")
        .required("please enter your password Confirm"),
    }),
    onSubmit: (values) => {
      setResponse("");
      setIsLoading(true);

      axios
        .post(`${endPoint.BASE_URL}${endPoint.RESET_PASSWORD}/${token}`, values)
        .then((data) => {
          console.log(data?.data);
          if (data?.data.status == "fail") setErrorMsg(data?.data?.message);
          if (data?.data.status == "success") setResponse(data?.data.message);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMsg(err?.response?.data?.data.message);
        });
    },
  });

  return (
    <main className="bg-white">
      {contentLoading ? (
        <div className="max-w-sm mt-20 flex flex-col items-center justify-center mx-auto px-4 py-8">
          <h1 className="text-xl text-blue-600 font-bold mb-6">
            Verifying Token ...
          </h1>
          <div>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </div>
        </div>
      ) : contentErr ? (
        <div className="max-w-sm h-[80vh] mt-20 flex flex-col items-center justify-center mx-auto px-4 py-8">
          <h1 className="text-xl text-gray-600 font-bold mb-6">
            Sorry! Token has been Expired,
            <br />
            Try Again.
          </h1>
          <button className="text-white bg-green-600 rounded-full hover:bg-green-800 px-28 py-2">
            <Link className="text-white hover:text-white" to={"/"}>
              Home
            </Link>
          </button>
        </div>
      ) : (
        <div className="relative md:flex">
          {/* Content */}

          <div className="md:w-1/2">
            <div className="min-h-screen h-full flex flex-col after:flex-1">
              {/* Header */}
              <div className="flex-1">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                  {/* Logo */}
                  <Link className="block" to="/">
                    <img width={"150px"} src={blackLogo} alt="" />
                  </Link>
                </div>
              </div>
              {response ? (
                <div className="max-w-sm mx-auto px-4 py-8">
                  <h1 className="text-xl text-slate-600 font-bold mb-6">
                    Password Changed Successfully
                  </h1>
                  <span>
                    <Link
                      className="bg-blue-500 px-10 py-1 rounded-full text-white hover:text-white hover:bg-blue-800 ease-in duration-500"
                      to="/signin"
                    >
                      {" "}
                      Sign In
                    </Link>{" "}
                    to You Account
                  </span>
                </div>
              ) : (
                <div className="max-w-sm mx-auto px-4 py-8">
                  <h1 className="text-2xl text-slate-800 font-bold mb-6">
                    Enter your New Password
                  </h1>
                  {/* Form */}
                  <form onSubmit={formik.handleSubmit}>
                    {errorMsg ? <p className="text-red-600">{errorMsg}</p> : ""}
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="password"
                          className="form-input w-full"
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                      </div>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-600">
                        {formik.errors.password}
                      </div>
                    ) : null}
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="passwordConfirm"
                        >
                          Password Confirm{" "}
                          <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="passwordConfirm"
                          className="form-input w-full"
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.passwordConfirm}
                        />
                      </div>
                    </div>
                    {formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm ? (
                      <div className="text-red-600">
                        {formik.errors.passwordConfirm}
                      </div>
                    ) : null}

                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
                      >
                        {isLoading ? (
                          <CompLoader height={"20px"} color="#ffffff" />
                        ) : (
                          "Change Password"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Image */}
          <div
            className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
            aria-hidden="true"
          >
            <img
              className="object-cover object-center w-full h-full"
              src={AuthImage}
              width="760"
              height="1024"
              alt="Authentication"
            />
            {/* <img
            className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block"
            src={AuthDecoration}
            width="218"
            height="224"
            alt="Authentication decoration"
          /> */}
          </div>
        </div>
      )}
    </main>
  );
}

export default ResetPassword;
