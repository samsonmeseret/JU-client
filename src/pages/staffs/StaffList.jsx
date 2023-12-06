import React, { useState, useMemo, useEffect, useCallback } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import SearchForm from "../../partials/actions/SearchForm";
import DeleteButton from "../../partials/actions/DeleteButton";
import DateSelect from "../../components/DateSelect";
import FilterButton from "../../components/DropdownFilter";
import Swal from "sweetalert2";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
// import data from "./data.json";
import { gridClasses } from "@mui/material";
import { grey } from "@mui/material/colors";
import { IoOpenOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import { GrClose } from "react-icons/gr";
import useFetch from "../../customHooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import EdittingForm from "./EdittingForm";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getInstructors } from "../../Redux/reducers/dataSlice";
import moment from "moment";

function StaffList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [loadState, setLoadState] = useState(false);
  const [spe, setSpe] = useState([]);
  const [sub, setSub] = useState([]);

  const { departmentId } = useParams();
  const { instructorList, departmentList, isLoading } = useSelector(
    (state) => state.deptData
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInstructors(departmentId));
  }, []);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const setDepartment = (e) => {
    const selectedDept = departmentList?.find(
      (dept) => dept.name == e.target.value
    );

    setSpe(selectedDept?.Specializations);
  };

  function ActionBtn({ params, rowId }) {
    let user = params.row;
    const editHandler = () => {
      setUserData(user);
      // setOpen(true);

      setIsEditing(true);
    };

    const viewHandler = () => {
      setIsEditing(false);
      setIsViewMode(true);
    };
    const deleteHandler = useCallback(() => {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete ${user.firstName} ${user.lastName}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/instructors/${user.id}`).then(() => {
            Swal.fire("Deleted!", "Staffs has been deleted.", "success");
            dispatch(getInstructors(departmentId));
          });
        }
      });
    }, [user]);

    return (
      <>
        <section className="flex gap-5 ">
          <Link
            style={{ borderRadius: "7px" }}
            to={`${user.id}`}
            // onClick={viewHandler}
            className="p-3   hover:outline outline-1 outline-blue-600 cursor-pointer "
          >
            <IoOpenOutline />
          </Link>
          <div
            onClick={editHandler}
            style={{ borderRadius: "7px" }}
            className="p-3  hover:outline outline-1 outline-green-600 cursor-pointer"
          >
            <GoPencil />
          </div>
          <div
            onClick={deleteHandler}
            style={{ borderRadius: "7px" }}
            className="p-3  hover:outline outline-1 outline-red-600 cursor-pointer"
          >
            <AiOutlineDelete />
          </div>
        </section>
      </>
    );
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    );
  }
  const [rowId, setRowId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const column = useMemo(() => [
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 170,
      renderCell: (params) => (
        // <UsersActions {...{ params, rowId, setRowId }} />
        <ActionBtn
          onClick={(e) => console.log(e.target)}
          {...{ params, rowId, setRowId }}
        />
      ),
    },
    {
      field: "firstName",
      headerName: "FirstName",
      width: 120,
    },
    {
      field: "middleName",
      headerName: "MiddleName",
      width: 120,
      // description:
      //   "The identification used by the person with access to the online service.",
    },
    {
      field: "lastName",
      headerName: "LastName",
      width: 120,
      // description:
      //   "The identification used by the person with access to the online service.",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 80,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      width: 120,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "qualification",
      headerName: "Educational Level",
      width: 150,
    },
    {
      field: "rank",
      headerName: "Academic Rank",
      width: 200,
    },

    {
      field: "DepartmentId",
      headerName: "Department",
      width: 150,
      renderCell: (params) => {
        let departmentFound = departmentList.find(
          (item) => item.id == params.row.DepartmentId
        );
        return departmentFound?.name;
      },
    },
    {
      field: "joinedYear",
      headerName: "Year Joined",
      width: 120,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "employment",
      headerName: "Employment Type",
      width: 150,
    },
    {
      field: "citizenship",
      headerName: "Citizenship",
      width: 170,
    },
    {
      field: "currentStatus",
      headerName: "Current Status",
      width: 170,
    },
  ]);
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
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      qualification: "",
      employment: "",
      rank: "",
      currentStatus: "",
      citizenship: "",
      DepartmentId: departmentId,
      joinedYear: "",
      phoneNumber: "",
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
      console.log(values);
      setLoadState(true);
      axiosInstance
        .post("/instructors", values)
        .then((data) => {
          toast.success("Staff Created Successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoadState(false);
          formik.resetForm();
          setOpen(false);
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
          setLoadState(false);
        });
    },
  });
  return (
    <div className="flex h-screen overflow-hidden">
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
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Staffs List 🩺
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                {/* <SearchForm placeholder="Search by Staff" /> */}
                {/* Create invoice button */}
                <button
                  onClick={() => setOpen(true)}
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Create Staff</span>
                </button>
              </div>
            </div>

            {/* More actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left side */}
              <div className="mb-4 sm:mb-0">
                <ul className="flex flex-wrap -m-1">
                  <li className="m-1">
                    <button
                      onClick={() => {
                        dispatch(getInstructors(departmentId));
                      }}
                      className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out"
                    >
                      Refresh <span className="ml-1 text-indigo-200">🔃</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Right side */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Delete button */}
                {/* <DeleteButton selectedItems={selectedItems} /> */}
                {/* Dropdown */}
                {/* <DateSelect /> */}
                {/* Filter button */}
                {/* <FilterButton align="right" /> */}
              </div>
            </div>

            {/* Table */}
            {/* <UsersListTable selectedItems={handleSelectedItems} /> */}
            <>
              <>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <section>
                      <div>
                        <div
                          className="ml-auto w-20 text-red-500 bg-red-50 rounded-md hover:bg-red-200 cursor-pointer ease-in duration-200 hover:text-red-900 p-1 flex justify-center "
                          onClick={handleClose}
                        >
                          {/* <GrClose /> */}
                          <span>close </span>
                        </div>

                        <h1 className="mx-auto text-center text-lg">
                          Staff Info
                        </h1>

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
                              {formik.touched.firstName &&
                              formik.errors.firstName ? (
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
                              {formik.touched.middleName &&
                              formik.errors.middleName ? (
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
                              {formik.touched.lastName &&
                              formik.errors.lastName ? (
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
                                <div className="text-red-600">
                                  {formik.errors.email}
                                </div>
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
                                <div className="text-red-600">
                                  {formik.errors.gender}
                                </div>
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
                              {formik.touched.dateOfBirth &&
                              formik.errors.dateOfBirth ? (
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
                              {formik.touched.phoneNumber &&
                              formik.errors.phoneNumber ? (
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
                                <option value={""}>
                                  -- Select Educational Level --
                                </option>
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
                                <option value={""}>
                                  -- Select Academic Rank --
                                </option>
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
                                <div className="text-red-600">
                                  {formik.errors.rank}
                                </div>
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
                                <option value={""}>
                                  -- Select Current Status --
                                </option>

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
                                <option value={""}>
                                  -- Select Citizenship --
                                </option>
                                <option value={"Ethiopian"}>Ethiopian</option>
                                <option value={"Foreigner"}>Foreigner</option>
                              </select>
                              {formik.touched.citizenship &&
                              formik.errors.citizenship ? (
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
                              {formik.touched.joinedYear &&
                              formik.errors.joinedYear ? (
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
                                <option value={""}>
                                  -- select employment type --
                                </option>

                                {["Full time", "Part time"].map((item) => (
                                  <option value={item}>{item}</option>
                                ))}
                              </select>
                              {formik.touched.employment &&
                              formik.errors.employment ? (
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
                              {loadState ? (
                                <CompLoader height={"20px"} color="#ffffff" />
                              ) : (
                                "Create Staff "
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </section>
                  </Box>
                </Modal>

                <EdittingForm
                  setEditing={setIsEditing}
                  isEditing={isEditing}
                  user={userData}
                  departmentId={departmentId}
                  // setIsLoading={setIsLoading}
                  // isLoading={isLoading}
                />
                <Box
                  sx={{
                    height: 440,
                    width: "100%",
                    backgroundColor: "white",
                    color: "grey",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid royalblue",
                  }}
                >
                  <DataGrid
                    columns={column}
                    rows={instructorList}
                    getRowId={(row) => row.id}
                    slots={{
                      toolbar: CustomToolbar,
                    }}
                    // checkboxSelection
                    loading={isLoading}
                    disableRowSelectionOnClick
                    {...instructorList}
                    rowsPerPageOptions={[5, 10, 20]}
                    getRowSpacing={(params) => ({
                      top: params.isFirstVisible ? 0 : 5,
                      bottom: params.isLastVisible ? 0 : 5,
                    })}
                    sx={{
                      [`& .${gridClasses.row}`]: {
                        bgcolor: (theme) =>
                          theme.palette.mode === "light"
                            ? grey[200]
                            : grey[900],
                      },
                    }}
                  />
                </Box>
              </>
            </>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StaffList;
