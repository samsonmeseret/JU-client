import React, { useState } from "react";
import { Link } from "react-router-dom";
import { endPoint } from "../api/api";
import axios from "axios";
import AuthImage from "../components/Hero/jimmaPic.jpg";
// import AuthDecoration from "../images/auth-decoration.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import CompLoader from "../components/CompLoader";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/reducers/authSlice";
import blackLogo from "../components/Nav/Logo/main-logo-black.png";
import { axiosInstance } from "../api/axios";

const cookies = new Cookie();

function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Minimum Password is 6 Character")
        .required("please enter your password to signIn"),
      email: Yup.string()
        .email("Invalid email address")
        .required("please enter your email"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);

      axiosInstance
        .post(`${endPoint.LOGIN}`, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((data) => {
          // window.localStorage.setItem("us_id", data.data.token);
          // cookies.set("us_id", data?.data?.token, {
          //   path: "/",
          //   secure: false,
          //   // httpOnly: true,
          //   expires: new Date(data?.data?.expires),
          // });
          // console.log(data)
          dispatch(getUser());
          setTimeout(() => {
            navigate("/dashboard");
            setIsLoading(false);
            // window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          setIsLoading(false);

          setErrorMsg(err?.response?.data?.message);
        });
    },
  });

  return (
    <main className="bg-white">
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

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">
                Welcome back!
              </h1>
              {errorMsg && (
                <p className="text-red-600 text-center">{errorMsg}</p>
              )}
              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      className="form-input w-full"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-600">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="form-input w-full"
                      type="password"
                      autoComplete="on"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-600">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link
                      className="text-sm underline hover:no-underline"
                      to="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                    // to="/"
                    type="submit"
                  >
                    {isLoading ? (
                      <CompLoader height={"20px"} color="#ffffff" />
                    ) : (
                      "Sign In "
                    )}
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  Don’t you have an account?{" "}
                  {/* <Link
                    className="font-medium text-indigo-500 hover:text-indigo-600"
                    to="/signup"
                  >
                    Sign Up
                  </Link> */}
                  <div className="mt-5">
                    <div className="bg-amber-100 text-amber-600 px-3 py-2 rounded">
                      <svg
                        className="inline w-3 h-3 shrink-0 fill-current mr-2"
                        viewBox="0 0 12 12"
                      >
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <span className="text-sm">
                        Since this is Internal System Contact your Office
                      </span>
                    </div>
                  </div>
                </div>
                {/* Warning */}
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${AuthImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
          }}
        >
          <img
            className="object-contain object-center w-full h-full"
            src={AuthImage}
            width="760"
            height="1024"
            alt="Authentication"
          />
        </div>
      </div>
    </main>
  );
}

export default Signin;
