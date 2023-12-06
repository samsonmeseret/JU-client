import React, { useState } from "react";
import useFetch from "../../customHooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import { Box, Modal } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getInstructors } from "../../Redux/reducers/dataSlice";

const EdittingForm = ({
  setEditing,
  isEditing,
  user,
  departmentId,
  // setIsLoading,
  // isLoading,
}) => {
  const [spe, setSpe] = useState([]);
  const [sub, setSub] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
      middleName: user?.lastName,
      email: user?.email,
      gender: user?.gender,
      dateOfBirth: user?.dateOfBirth,
      qualification: user?.qualification,
      employment: user?.employment,
      rank: user?.rank,
      currentStatus: user?.currentStatus,
      citizenship: user?.citizenship,
      DepartmentId: departmentId,
      joinedYear: user?.joinedYear,
      phoneNumber: user?.phoneNumber,
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("please enter the firstName"),
      middleName: Yup.string().required("please enter the middleName"),
      lastName: Yup.string().required("please enter the lastName"),
      email: Yup.string()
        .email("Invalid email address")
        .required("please enter your email"),
      gender: Yup.string().required("please enter the gender"),
      phoneNumber: Yup.string().required("please enter phone number"),
      dateOfBirth: Yup.string().required("please specify the birth date"),
      qualification: Yup.string().required("please choose the qualification"),
      DepartmentId: Yup.number().required("please choose the department"),
      citizenship: Yup.string().required("please select citizenship"),
      currentStatus: Yup.string(),
      rank: Yup.string().required("please select the rank"),
      joinedYear: Yup.string().required("please enter the year staff joined"),
      employment: Yup.string().required("please specify the employment type"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      axiosInstance
        .patch(`/instructors/${user.id}`, values)
        .then((data) => {
          toast.success("Staff Updated Successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false);
          formik.resetForm();
          // setOpen(false);
          setEditing(false);
          dispatch(getInstructors(departmentId));
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

          <h1 className="mx-auto text-center text-lg">Staff Info</h1>

          <section>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
                  {/* FIrstNAme */}
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
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="text-red-600">
                        {formik.errors.firstName}
                      </div>
                    ) : null}
                  </div>
                  {/* MiddleName */}
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
                    />
                    {formik.touched.middleName && formik.errors.middleName ? (
                      <div className="text-red-600">
                        {formik.errors.middleName}
                      </div>
                    ) : null}
                  </div>
                  {/* LastName */}
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
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="text-red-600">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </div>
                  {/* Email Address */}
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
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-600">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  {/* Gender */}
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
                    >
                      <option value={""}>-- Select Gender --</option>
                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="text-red-600">{formik.errors.gender}</div>
                    ) : null}
                  </div>
                  {/* Date OF Birth */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="dateOfBirth"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      className="form-input w-full"
                      type="date"
                      autoComplete="on"
                      name="dateOfBirth"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dateOfBirth}
                    />
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                      <div className="text-red-600">
                        {formik.errors.dateOfBirth}
                      </div>
                    ) : null}
                  </div>
                  {/* Phone Number */}
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
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <div className="text-red-600">
                        {formik.errors.phoneNumber}
                      </div>
                    ) : null}
                  </div>
                  {/* Qualifications */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="qualification"
                    >
                      Educational Level
                    </label>
                    <select
                      id="qualification"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="qualification"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.qualification}
                    >
                      <option value={""}>-- Select Educational Level --</option>
                      {[
                        "BSC",
                        "MD",
                        "DMD",
                        "MSC",
                        "PhD",
                        "Specialty",
                        "Subspecialty",
                        "Super specialty",
                      ].map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {formik.touched.qualification &&
                    formik.errors.qualification ? (
                      <div className="text-red-600">
                        {formik.errors.qualification}
                      </div>
                    ) : null}
                  </div>
                  {/* Rank */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="rank"
                    >
                      Academic Rank
                    </label>
                    <select
                      id="rank"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="rank"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.rank}
                    >
                      <option value={""}>-- Select Academic Rank --</option>
                      {[
                        "Graduate Assistant I",
                        "Graduate Assistant II",
                        "Assistant Lecturer",
                        "Assistant Professor",
                        "Associate Professor",
                        "Professor",
                        "Lecturer",
                        "Technical Assistant I",
                        "Technical Assistant II",
                        "Technical Assistant III",
                        "Senior Technical Assistant I",
                        "Senior Technical Assistant II",
                        "Senior Technical Assistant III",
                        "Chief Technical Assistant I",
                        "Chief Technical Assistant II",
                        "Chief Technical Assistant III",
                      ].map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                    {formik.touched.rank && formik.errors.rank ? (
                      <div className="text-red-600">{formik.errors.rank}</div>
                    ) : null}
                  </div>
                  {/* Current Status */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="currentStatus"
                    >
                      Current Status
                    </label>
                    <select
                      id="currentStatus"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="currentStatus"
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.currentStatus}
                    >
                      <option value={""}>-- Select Current Status --</option>

                      <option value={"active"}>Active</option>
                      <option value={"not-active"}>Not Active</option>
                    </select>
                    {formik.touched.currentStatus &&
                    formik.errors.currentStatus ? (
                      <div className="text-red-600">
                        {formik.errors.currentStatus}
                      </div>
                    ) : null}
                  </div>
                  {/* citizenship */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="citizenship"
                    >
                      Citizenship
                    </label>
                    <select
                      id="citizenship"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="citizenship"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.citizenship}
                    >
                      <option value={""}>-- Select Citizenship --</option>
                      <option value={"Ethiopian"}>Ethiopian</option>
                      <option value={"Foreigner"}>Foreigner</option>
                    </select>
                    {formik.touched.citizenship && formik.errors.citizenship ? (
                      <div className="text-red-600">
                        {formik.errors.citizenship}
                      </div>
                    ) : null}
                  </div>
                  {/* Joined Year */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="joinedYear"
                    >
                      Staff Joined Year
                    </label>
                    <input
                      id="joinedYear"
                      className="form-input w-full"
                      type="date"
                      autoComplete="on"
                      name="joinedYear"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.joinedYear}
                    />
                    {formik.touched.joinedYear && formik.errors.joinedYear ? (
                      <div className="text-red-600">
                        {formik.errors.joinedYear}
                      </div>
                    ) : null}
                  </div>
                  {/* Employment Type */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="employment"
                    >
                      Select Employment Type
                    </label>
                    <select
                      id="employment"
                      className="form-input w-full"
                      type="text"
                      autoComplete="on"
                      name="employment"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.employment}
                    >
                      <option value={""}>-- select employment type --</option>

                      {["Full time", "Part time"].map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                    {formik.touched.employment && formik.errors.employment ? (
                      <div className="text-red-600">
                        {formik.errors.employment}
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
                      "Update Staff "
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
