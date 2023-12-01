import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "../../images/user-avatar-80.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../../api/axios";
import PulseLoader from "../../components/PulseLoader/PulseLoader";
import { getUser } from "../../Redux/reducers/authSlice";
import { getDepartments } from "../../Redux/reducers/dataSlice";

function AccountPanel() {
  const [sync, setSync] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    gender: "",
    role: "",
    DepartmentId: "",
    phoneNumber: "",
    avator: "",
  });
  const [avatorImg, setAvatorImg] = useState({});
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { departmentList } = useSelector((state) => state.deptData);
  // console.log(user)

  useEffect(() => {
    (!departmentList || departmentList?.length == 0) &&
      dispatch(getDepartments());
  }, []);
  console.log(user);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName ? user?.firstName : "",
      middleName: user?.middleName ? user?.middleName : "",
      lastName: user?.lastName ? user?.lastName : "",
      gender: user?.gender ? user?.gender : "",
      email: user?.email ? user?.email : "",
      phoneNumber: user?.phoneNumber ? user?.phoneNumber : "",
      DepartmentId: user?.DepartmentId ? user?.DepartmentId : "",
      avator: user?.avator ? user?.avator : "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("please enter your FirstName"),
      middleName: Yup.string().required("please enter your MiddleName "),
      lastName: Yup.string().required("please enter your LastName"),
      gender: Yup.string().required("please enter your Gender"),
      email: Yup.string().required("please enter your Email"),
      DepartmentId: Yup.number().required("please enter your Department"),
      phoneNumber: Yup.string().required("please enter your Phone Number"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("middleName", values.middleName);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("DepartmentId", values.DepartmentId);
      values.role && formData.append("role", values.role);
      formData.append("phoneNumber", values.phoneNumber);
      if (avatorImg) {
        formData.append("avator", avatorImg);
      }
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axiosInstance
            .patch(`/users/${user.id}`, formData)
            .then((data) => {
              fetchAllData("/users");
              formik.resetForm();
              setIsLoading(false);
              setIsError(false);
              // closeAfter15();
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);
              setIsError(true);
              //  Swal.fire("Changes are not saved", "", "info");
            });
          dispatch(getUser());
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });
    },
  });

  return isLoading ? (
    <PulseLoader />
  ) : (
    <>
      <div className="grow">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-6 space-y-6">
            <h2 className="text-2xl text-slate-800 font-bold mb-5">
              My Account
            </h2>
            {/* User Names */}
            <section>
              <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
                {formik.values.firstName} {formik.values.lastName}
              </h2>
              <div className="text-sm">
                Dear User you can update your account information, Phone Number
                and Passwords below
              </div>
              <div className="flex gap-5 h-[100px] ">
                <div className="w-[100px] rounded-full overflow-hidden h-[100px]">
                  <img
                    className=" h-[100px] object-cover"
                    src={formik.values.avator}
                    alt=""
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="avator"
                  >
                    Picture
                  </label>
                  <input
                    id="avator"
                    name="avator"
                    className="form-input w-full"
                    type="file"
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // value={formik.values.firstName}
                    onChange={(e) => setAvatorImg(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    FirstName
                  </label>
                  <input
                    id="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className="form-input w-full"
                    type="text"
                    name="firstName"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <small className="text-red-600">
                      {formik.errors.firstName}
                    </small>
                  ) : null}
                </div>
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="middleName"
                  >
                    MiddleName
                  </label>
                  <input
                    id="middleName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.middleName}
                    className="form-input w-full"
                    type="text"
                    name="middleName"
                  />
                  {formik.touched.middleName && formik.errors.middleName ? (
                    <small className="text-red-600">
                      {formik.errors.middleName}
                    </small>
                  ) : null}
                </div>
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="lastName"
                  >
                    LastName
                  </label>
                  <input
                    id="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    className="form-input w-full"
                    type="text"
                    name="lastName"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <small className="text-red-600">
                      {formik.errors.lastName}
                    </small>
                  ) : null}
                </div>
              </div>

              {/* second One */}
              <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                {/* Gender */}
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="gender"
                    className="form-input w-full"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <small className="text-red-600">
                      {formik.errors.gender}
                    </small>
                  ) : null}
                </div>
                {/* Email Address */}
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="form-input w-full"
                    type="text"
                    name="email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <small className="text-red-600">
                      {formik.errors.email}
                    </small>
                  ) : null}
                </div>
                {/* Department */}
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="DepartmentId"
                  >
                    Department
                  </label>
                  <select
                    id="DepartmentId"
                    name="DepartmentId"
                    value={formik.values.DepartmentId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-input w-full"
                  >
                    {departmentList?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                  {formik.touched.DepartmentId && formik.errors.DepartmentId ? (
                    <small className="text-red-600">
                      {formik.errors.DepartmentId}
                    </small>
                  ) : null}
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
                Phone Number
              </h2>
              <div className="flex flex-wrap mt-5">
                <div className="mr-2">
                  <label className="sr-only" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                    className="form-input w-full"
                    type="text"
                    name="phoneNumber"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <small className="text-red-600">
                      {formik.errors.phoneNumber}
                    </small>
                  ) : null}
                </div>
              </div>
            </section>
            {/* Password */}
            <section>
              <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
                Password
              </h2>
              <div className="text-sm">
                You can set a new password if you don't want to use your current
                password.
              </div>
              <div className="mt-5">
                <Link
                  to={"update-password"}
                  className="btn border-slate-200 shadow-sm text-indigo-500"
                >
                  Change Password
                </Link>
              </div>
            </section>
          </div>
          {/* Panel footer */}
          <footer>
            <div className="flex flex-col px-6 py-5 border-t border-slate-200">
              <div className="flex self-end">
                <Link to={"/dashboard/"}>
                  <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </footer>
        </form>
      </div>
    </>
  );
}

export default AccountPanel;
