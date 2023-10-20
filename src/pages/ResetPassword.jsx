import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthImage from "../components/Hero/jimmaPic.jpg";
import AuthDecoration from "../images/auth-decoration.png";
import blackLogo from "../components/Nav/Logo/main-logo-black.png";
import { endPoint } from "../api/api";
import axios from "axios";
import CompLoader from "../components/CompLoader";

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [response, setResponse] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email"),
    }),
    onSubmit: (values) => {
      setResponse("");
      setIsLoading(true);

      axios
        .post(`${endPoint.BASE_URL}${endPoint.FORGOT_PASSWORD}`, values)
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
                  {response}
                </h1>
              </div>
            ) : (
              <div className="max-w-sm mx-auto px-4 py-8">
                <h1 className="text-3xl text-slate-800 font-bold mb-6">
                  Reset your Password
                </h1>
                {/* Form */}
                <form onSubmit={formik.handleSubmit}>
                  <div className="space-y-4">
                    {errorMsg ? <p className="text-red-600">{errorMsg}</p> : ""}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        className="form-input w-full"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                    </div>
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600">{formik.errors.email}</div>
                  ) : null}

                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
                    >
                      {isLoading ? (
                        <CompLoader height={"20px"} color="#ffffff" />
                      ) : (
                        "Send Reset Link"
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
    </main>
  );
}

export default ResetPassword;
