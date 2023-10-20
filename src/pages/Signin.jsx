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

      axios
        .post(`${endPoint.BASE_URL}${endPoint.LOGIN}`, values)
        .then((data) => {
          cookies.set("us_id", data?.data?.token, {
            path: "/",
            secure: false,
            // httpOnly: true,
            expires: new Date(data?.data?.expires),
          });
          // console.log(data)
          dispatch(getUser());
          setTimeout(() => {
            navigate("/dashboard");
            setIsLoading(false);

            window.location.reload();
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

                  {/* <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient
                        x1="28.538%"
                        y1="20.229%"
                        x2="100%"
                        y2="108.156%"
                        id="logo-a"
                      >
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient
                        x1="88.638%"
                        y1="29.267%"
                        x2="22.42%"
                        y2="100%"
                        id="logo-b"
                      >
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path
                      d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                      fill="url(#logo-a)"
                    />
                    <path
                      d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                      fill="url(#logo-b)"
                    />
                  </svg> */}
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
