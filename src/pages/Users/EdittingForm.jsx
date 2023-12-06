import React, { useEffect, useState } from "react";
import useFetch from "../../customHooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import { Box, Modal } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "../../Redux/reducers/dataSlice";
import { getUser } from "../../Redux/reducers/authSlice";
const EdittingForm = ({
  setEditing,
  isEditing,
  user,
  setIsLoading,
  isLoading,
}) => {
  const {
    fetchAllData,
    fetchSingleData,
    postData,
    updateData,
    deleteSelectedData,
    deleteSingleData,
  } = useFetch();
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

  const { departmentList } = useSelector((state) => state.deptData);
  const dispatch = useDispatch();

  useEffect(() => {
    (!departmentList || departmentList?.length == 0) &&
      dispatch(getDepartments());
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 800,
    maxHeight: "100vh",
    overflowY: "scroll",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "7px",
    boxShadow: 24,
    p: 4,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      middleName: user?.middleName,
      email: user?.email,
      gender: user?.gender,
      role: user?.role,
      DepartmentId: user?.DepartmentId,
      phoneNumber: user?.phoneNumber,
      avator: user?.avator,
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("please enter the firstName"),
      middleName: Yup.string().required("please enter the middleName"),
      lastName: Yup.string().required("please enter the lastName"),
      email: Yup.string()
        .email("Invalid email address")
        .required("please enter your email"),
      gender: Yup.string().required("please enter the gender"),
      DepartmentId: Yup.number().required("please choose the department"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("middleName", values.middleName);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("DepartmentId", values.DepartmentId);
      formData.append("role", values.role);
      formData.append("phoneNumber", values.phoneNumber);
      if (avatorImg) {
        formData.append("avator", avatorImg);
      }
      axiosInstance
        .patch(`/users/${user.id}`, formData)
        .then((data) => {
          toast.success("User Updated Successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          fetchAllData("/users");
          dispatch(getUser());
          formik.resetForm();
          setIsLoading(false);
          setEditing(false);
        })

        .catch((err) => {
          toast.error("Error Occurred try again later ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false);
          setEditing(false);
        });
    },
  });
  return (
    <>
      <Modal
        open={isEditing}
        onClose={setEditing}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="ml-auto w-20 text-red-500 bg-red-50 rounded-md hover:bg-red-200 cursor-pointer ease-in duration-200 hover:text-red-900 p-1 flex justify-center "
            onClick={() => setEditing(false)}
          >
            {/* <GrClose /> */}
            <span>close </span>
          </div>

          <h1 className="mx-auto text-center text-lg">User Info</h1>

          <section>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
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
                    {/* {formik.touched.firstName &&
                              formik.errors.firstName ? (
                                <div className="text-red-600">
                                  {formik.errors.firstName}
                                </div>
                              ) : null} */}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      className="form-input w-full"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      //   defaultValue={user.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <small className="text-red-600">
                        {formik.errors.firstName}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="middleName"
                    >
                      Middle Name
                    </label>
                    <input
                      id="middleName"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="middleName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.middleName}
                      //   defaultValue={user.middleName}
                    />
                    {formik.touched.middleName && formik.errors.middleName ? (
                      <small className="text-red-600">
                        {formik.errors.middleName}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      //   defaultValue={user.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <small className="text-red-600">
                        {formik.errors.lastName}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      className="form-input w-full"
                      type="email"
                      autoComplete="on"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      //   defaultValue={user.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <small className="text-red-600">
                        {formik.errors.email}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="gender"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gender}
                      //   defaultValue={user.gender}
                    >
                      <option value={""}>-- Select Gender --</option>
                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender ? (
                      <small className="text-red-600">
                        {formik.errors.gender}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="phoneNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                      //   defaultValue={user.phoneNumber}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <small className="text-red-600">
                        {formik.errors.phoneNumber}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="role"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="role"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.role}
                      //   value={user?.role}
                    >
                      <option value={""}>-- Select Role --</option>
                      <option value={"dean"}>Dean</option>
                      <option value={"head"}>Head</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                      <small className="text-red-600">
                        {formik.errors.role}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="DepartmentId"
                    >
                      Department
                    </label>
                    <select
                      id="DepartmentId"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="DepartmentId"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.DepartmentId}
                    >
                      <option value="">select Department</option>

                      {departmentList ? (
                        departmentList?.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))
                      ) : (
                        <option value="">No Department Added</option>
                      )}
                    </select>
                    {formik.touched.DepartmentId &&
                    formik.errors.DepartmentId ? (
                      <div className="text-red-600">
                        {formik.errors.DepartmentId}
                      </div>
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
                      "Update User "
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </Box>
      </Modal>
    </>
  );
};

export default EdittingForm;
