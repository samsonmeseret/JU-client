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
import { Link } from "react-router-dom";
import CompLoader from "../../components/CompLoader";
import ModalBasic from "../../components/ModalBasic";
import { axiosInstance } from "../../api/axios";
import EdittingForm from "./EdittingForm";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "../../Redux/reducers/dataSlice";
import { toast, ToastContainer } from "react-toastify";

function DepartmentList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [department, setDepartment] = useState({});

  const dispatch = useDispatch();
  const { fetchAllData } = useFetch();
  const { departmentList, isLoading } = useSelector((state) => state.deptData);
  console.log(departmentList);
  useEffect(() => {
    if (!departmentList || departmentList?.length == 0) {
      dispatch(getDepartments());
    }
  }, []);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  function ActionBtn({ params, rowId }) {
    let department = params.row;
    const editHandler = () => {
      setDepartment(department);
      setOpen(false);
      setIsEditing(true);
    };

    // const viewHandler = () => {
    //   setIsEditing(false);
    //   setIsViewMode(true);
    // };
    const deleteHandler = useCallback(() => {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete ${department.name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/departments/${department.id}`).then(() => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            dispatch(getDepartments());
          });
        }
      });
    }, [department]);

    return (
      <>
        <section className="flex gap-5 ">
          <Link
            style={{ borderRadius: "7px" }}
            to={`${department.id}`}
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
          // onClick={(e) => console.log(e.target)}
          {...{ params, rowId, setRowId }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Department Name",
      width: 200,
    },
    {
      field: "departmentHead",
      headerName: "Department Head",
      width: 200,
      description: "Department head of the Faculity",
    },
    {
      field: "academicCoordinator",
      headerName: "Academic Coordinator",
      width: 200,
      description: "Accedemic Coordinator of the Faculity",
    },
    {
      field: "clinicalCoordinator",
      headerName: "Clinical Coordinator",
      width: 200,
      description: "Clinical Coordinator in the Hospital",
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
    initialValues: {
      name: "",
      departmentHead: "",
      academicCoordinator: "",
      clinicalCoordinator: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("please enter the department name"),
      academicCoordinator: Yup.string().required(
        "please enter the academic coordinator"
      ),

      clinicalCoordinator: Yup.string().required(
        "please enter the clinical coordinator"
      ),
      departmentHead: Yup.string().required("please enter the department head"),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post("/departments", values)
        .then((data) => {
          toast.success("Department Created Successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          formik.resetForm();
          setOpen(false);
          dispatch(getDepartments());
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
        });
      dispatch(getDepartments());
    },
  });
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Content area */}
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
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Departments 🎓
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                {/* <SearchForm placeholder="Search by Dapartment" /> */}
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
                  <span className="hidden xs:block ml-2">
                    Create Department
                  </span>
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
                        dispatch(getDepartments());
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
            {/* Create Form MOdal */}
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
                          Department Info
                        </h1>

                        <form onSubmit={formik.handleSubmit}>
                          <div className="space-y-4">
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="name"
                              >
                                Department Name
                              </label>
                              <input
                                id="name"
                                name="name"
                                className="form-input w-full"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-600">
                                  {formik.errors.name}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="departmentHead"
                              >
                                Department Head
                              </label>
                              <input
                                id="departmentHead"
                                className="form-input w-full"
                                type="text"
                                autoComplete="on"
                                name="departmentHead"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.departmentHead}
                              />
                              {formik.touched.departmentHead &&
                              formik.errors.departmentHead ? (
                                <div className="text-red-600">
                                  {formik.errors.departmentHead}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="academicCoordinator"
                              >
                                Acedamic Coordinator
                              </label>
                              <input
                                id="academicCoordinator"
                                className="form-input w-full"
                                type="text"
                                autoComplete="on"
                                name="academicCoordinator"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.academicCoordinator}
                              />
                              {formik.touched.academicCoordinator &&
                              formik.errors.academicCoordinator ? (
                                <div className="text-red-600">
                                  {formik.errors.academicCoordinator}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="clinicalCoordinator"
                              >
                                Clinical Coordinator
                              </label>
                              <input
                                id="clinicalCoordinator"
                                className="form-input w-full"
                                type="text"
                                autoComplete="on"
                                name="clinicalCoordinator"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.clinicalCoordinator}
                              />
                              {formik.touched.clinicalCoordinator &&
                              formik.errors.clinicalCoordinator ? (
                                <div className="text-red-600">
                                  {formik.errors.clinicalCoordinator}
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
                                "Create Department"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </section>
                  </Box>
                </Modal>
                {/* Edit Form Component */}
                <EdittingForm
                  setEditing={setIsEditing}
                  isEditing={isEditing}
                  department={department}
                  //   setIsLoading={setIsLoading}
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
                    rows={departmentList}
                    getRowId={(row) => row.id}
                    slots={{
                      toolbar: CustomToolbar,
                    }}
                    // checkboxSelection
                    loading={isLoading}
                    disableRowSelectionOnClick
                    {...departmentList}
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

export default DepartmentList;
