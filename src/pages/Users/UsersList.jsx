import React, { useState, useMemo, useEffect, useCallback } from "react";
// import Sidebar from "../../partials/Sidebar";
// import Header from "../../partials/Header";
import SearchForm from "../../partials/actions/SearchForm";
// import DeleteButton from "../../partials/actions/DeleteButton";
// import DateSelect from "../../components/DateSelect";
// import FilterButton from "../../components/DropdownFilter";
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
// import useFetch from "../../customHooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import CompLoader from "../../components/CompLoader";
// import ModalBasic from "../../components/ModalBasic";
import { axiosInstance } from "../../api/axios";
import EdittingForm from "./EdittingForm";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

function UsersList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    gender: "",
    password: "",
    passwordConfirm: "",
    role: "",
    DepartmentId: "",
    phoneNumber: "",
    avator: "",
  });
  const [avatorImg, setAvatorImg] = useState({});
  const { departmentList } = useSelector((state) => state.deptData);
  // console.log(departmentList)
  const fetchUser = async () => {
    axiosInstance
      .get("/users")
      .then((data) => {
        // console.log(data?.data?.result)
        setResult(data?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [isEditing]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
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
          axiosInstance.delete(`/users/${user.id}`).then(() => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            fetchUser();
          });
        }
      });
    }, [user]);

    return (
      <>
        <section className="flex gap-5 ">
          <Link
            style={{ width: "40px", height: "40px" }}
            to={`${user.id}`}
            // onClick={viewHandler}
            className="rounded-full overflow-hidden border border-1 border-gray-500 hover:border-blue-500"
          >
            {/* <IoOpenOutline /> */}
            <img className="h-[40px] object-cover" src={user?.avator} alt="" />
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
        <ActionBtn {...{ params, rowId, setRowId }} />
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
      description:
        "The identification used by the person with access to the online service.",
    },
    {
      field: "lastName",
      headerName: "LastName",
      width: 120,
      description:
        "The identification used by the person with access to the online service.",
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
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
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      width: 80,
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
  console.log(departmentList);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      gender: "",
      password: "",
      passwordConfirm: "",
      role: "",
      DepartmentId: "",
      phoneNumber: "",
      avator: "",
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
      role: Yup.string().required("please specify the role"),
      DepartmentId: Yup.number().required(
        "please choose the department, if no department, add them"
      ),
      password: Yup.string()
        .min(6, "Minimum Password is 6 Character")
        .required("please enter your password"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords is not match")
        .required("please enter your password Confirm"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("middleName", values.middleName);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("password", values.password);
      formData.append("passwordConfirm", values.passwordConfirm);
      formData.append("DepartmentId", values.DepartmentId);
      formData.append("role", values.role);
      formData.append("phoneNumber", values.phoneNumber);
      if (avatorImg) {
        formData.append("avator", avatorImg);
      }
      axiosInstance
        .post("/signup", formData)
        .then((data) => {
          toast.success("User Created Successfully", {
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
          setOpen(false);
          formik.resetForm();
          fetchUser();
          // fetchAllData("/users");
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
                  System Users 👥
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                {/* <SearchForm placeholder="Search by User" /> */}
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
                  <span className="hidden xs:block ml-2">Create User</span>
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
                        // fetchAllData("/users");
                        fetchUser();
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
                        <div className="ml-auto" onClick={handleClose}>
                          <GrClose className="ml-auto" />
                        </div>

                        <h1 className="mx-auto text-center text-lg">
                          User Info
                        </h1>

                        <form onSubmit={formik.handleSubmit}>
                          <div className="space-y-4">
                            {/* Profile Picture */}
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
                                onChange={(e) =>
                                  setAvatorImg(e.target.files[0])
                                }
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
                              />
                              {formik.touched.firstName &&
                              formik.errors.firstName ? (
                                <div className="text-red-600">
                                  {formik.errors.firstName}
                                </div>
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
                              />
                              {formik.touched.middleName &&
                              formik.errors.middleName ? (
                                <div className="text-red-600">
                                  {formik.errors.middleName}
                                </div>
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
                              />
                              {formik.touched.lastName &&
                              formik.errors.lastName ? (
                                <div className="text-red-600">
                                  {formik.errors.lastName}
                                </div>
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
                              />
                              {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-600">
                                  {formik.errors.email}
                                </div>
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
                              >
                                <option value={""}>-- Select Role --</option>
                                <option value={"dean"}>Dean</option>
                                <option value={"head"}>Head</option>
                              </select>
                              {formik.touched.role && formik.errors.role ? (
                                <div className="text-red-600">
                                  {formik.errors.role}
                                </div>
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
                              {formik.touched.password &&
                              formik.errors.password ? (
                                <div className="text-red-600">
                                  {formik.errors.password}
                                </div>
                              ) : null}
                            </div>
                            <div>
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
                                autoComplete="on"
                                name="passwordConfirm"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordConfirm}
                              />
                              {formik.touched.passwordConfirm &&
                              formik.errors.passwordConfirm ? (
                                <div className="text-red-600">
                                  {formik.errors.passwordConfirm}
                                </div>
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
                                "Create User "
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
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
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
                    rows={result}
                    getRowId={(row) => row.id}
                    slots={{
                      toolbar: CustomToolbar,
                    }}
                    // checkboxSelection
                    loading={isLoading}
                    disableRowSelectionOnClick
                    {...result}
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

export default UsersList;
