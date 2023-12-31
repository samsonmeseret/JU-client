import React, { useState, useMemo, useEffect, useCallback } from "react";
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
import { SiNike } from "react-icons/si";
import Modal from "@mui/material/Modal";
import { GrClose } from "react-icons/gr";
import useFetch from "../../customHooks/useFetch";
import { swap, useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import EdittingForm from "./EdittingForm";
import { useSelector, useDispatch } from "react-redux";
// import {
//     getLeaves,
//     getInstructors,
//     getUsers
// } from "../../Redux/reducers/dataSlice";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

function OfficeList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [office, setOffice] = useState({});

  const { fetchAllData, result, isLoading } = useFetch();

  const { user, isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchAllData("/offices");
  }, [isEditing]);

  //   const handleSelectedItems = (selectedItems) => {
  //     setSelectedItems([...selectedItems]);
  //   };

  function ActionBtn({ params, rowId }) {
    let officeSelected = params.row;

    const editHandler = () => {
      setOffice(params?.row);
      setIsEditing(true);
    };

    const deleteHandler = useCallback(() => {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete this Office`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/offices/${officeSelected.id}`).then(() => {
            Swal.fire("Deleted!", "Office has been deleted.", "success");
            fetchAllData("/offices");
          });
        }
      });
    }, [officeSelected]);

    return (
      <>
        <section className="flex gap-2 justify-center   ">
          <div>
            <Link className="text-blue-700 p-3 " to={`${officeSelected.id}`}>
              Open
            </Link>
          </div>

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
      width: 200,
      renderCell: (params) => (
        <ActionBtn onClick={(e) => {}} {...{ params, rowId, setRowId }} />
      ),
    },
    {
      field: "name",
      headerName: "Office Name",
      width: 200,
      description: "Clinical Coordinator in the Hospital",
    },
    {
      field: "coordinator",
      headerName: "Office Coordinator",
      width: 250,
    },
    {
      field: "majorActivity",
      headerName: "Major Activities",
      width: 250,
    },
    {
      field: "appointedDate",
      headerName: "Appointed Date",
      width: 200,
      renderCell: (data) => {
        return <div>{moment(data?.row?.appointedDate).format("ll")}</div>;
      },
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
      // description: "",
      coordinator: "",
      majorActivity: "",
      appointedDate: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("please enter the office name"),
      coordinator: Yup.string().required("please provide the coordinator"),
      majorActivity: Yup.string().required("please provide the major activity"),
      appointedDate: Yup.string().required("please provide the appinted date"),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post("/offices", values)
        .then((data) => {
          toast.success("Office Created Successfully", {
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
          fetchAllData("/offices");
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
      // dispatch(getDepartments());
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
                  Offices under 🎓
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                {/* <SearchForm placeholder="Search by Office Name" /> */}
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
                  <span className="hidden xs:block ml-2">Create Office</span>
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
                        fetchAllData("/offices");
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
                        <div
                          className="ml-auto w-20 text-red-500 bg-red-50 rounded-md hover:bg-red-200 cursor-pointer ease-in duration-200 hover:text-red-900 p-1 flex justify-center "
                          onClick={handleClose}
                        >
                          {/* <GrClose /> */}
                          <span>close</span>
                        </div>

                        <h1 className="mx-auto text-center text-lg">
                          Office Info
                        </h1>

                        <form onSubmit={formik.handleSubmit}>
                          <div className="space-y-4">
                            {/* Office Name */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="name"
                              >
                                Office Name
                              </label>
                              <input
                                name="name"
                                id="name"
                                type="text"
                                className="form-input w-full"
                                autoComplete="on"
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
                            {/* Coordinator */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="coordinator"
                              >
                                Office Coordinator
                              </label>
                              <input
                                id="coordinator"
                                name="coordinator"
                                className="form-input w-full"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.coordinator}
                              />
                              {formik.touched.coordinator &&
                              formik.errors.coordinator ? (
                                <div className="text-red-600">
                                  {formik.errors.coordinator}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="majorActivity"
                              >
                                Major Activities
                              </label>
                              <textarea
                                row={5}
                                id="majorActivity"
                                name="majorActivity"
                                className="form-input w-full"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.majorActivity}
                              />
                              {formik.touched.majorActivity &&
                              formik.errors.majorActivity ? (
                                <div className="text-red-600">
                                  {formik.errors.majorActivity}
                                </div>
                              ) : null}
                            </div>
                            {/* appionted date */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="appointedDate"
                              >
                                Appointed Date
                              </label>
                              <input
                                id="appointedDate"
                                name="appointedDate"
                                className="form-input w-full"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.appointedDate}
                              />
                              {formik.touched.appointedDate &&
                              formik.errors.appointedDate ? (
                                <div className="text-red-600">
                                  {formik.errors.appointedDate}
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
                                "Create Office"
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
                  office={office}
                  // department={specialization}
                  // departmentList={departmentList}
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

export default OfficeList;
