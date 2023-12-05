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
import ModalBasic from "../../components/ModalBasic";
import { axiosInstance } from "../../api/axios";
import EdittingForm from "./EdittingForm";
import { useSelector, useDispatch } from "react-redux";
import {
  getLeaves,
  getInstructors,
  getUsers,
  getAllInstructors,
} from "../../Redux/reducers/dataSlice";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

function LeaveList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [education, setEducation] = useState({});

  const dispatch = useDispatch();
  const { fetchAllData, isLoading, result } = useFetch();
  const { allInstructors } = useSelector((state) => state.deptData);
  const { user, isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllInstructors());

    fetchAllData("/on-education");
  }, [isEditing]);

  //   const handleSelectedItems = (selectedItems) => {
  //     setSelectedItems([...selectedItems]);
  //   };

  function ActionBtn({ params, rowId }) {
    let leaveSelected = params.row;

    const editHandler = () => {
      setEducation(params?.row);

      // setLeave(leaveSelected)
      setOpen(false);
      setIsEditing(true);
    };

    const deleteHandler = useCallback(() => {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete this education Status of the staff`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/on-education/${leaveSelected.id}`).then(() => {
            Swal.fire("Deleted!", "the status has been deleted.", "success");
            fetchAllData("/on-education");
          });
        }
      });
    }, [leaveSelected]);

    return (
      <>
        <section className="flex gap-2 ">
          {/* {(user?.role == "dean" && leaveSelected?.status != "declined") && <button
                        style={{ borderRadius: "7px" }}
                        // to={`${specialization.id}`}
                        onClick={leaveSelected?.status == "pending" ? approveHandler : null}
                        className={leaveSelected?.status == "pending" ? "p-3 text-green-700  hover:outline outline-1 outline-blue-600 cursor-pointer " : "p-3 text-red-600-700   "}
                    >
                        <span className=""> {(leaveSelected?.status == "pending") ? "Approve" : "Approved"} </span>
                    </button>}
                    {(user?.role == "dean" && leaveSelected?.status != "approved") && <button
                        style={{ borderRadius: "7px" }}
                        // to={`${specialization.id}`}
                        onClick={leaveSelected?.status == "pending" ? declineHandler : null}
                        className={leaveSelected?.status == "pending" ? "p-3 text-green-700  hover:outline outline-1 outline-blue-600 cursor-pointer " : "p-3 text-red-600-700   "}
                    >
                        <span className=""> {(leaveSelected?.status == "pending" && leaveSelected.status != "approved" && leaveSelected.status != "declined") ? "Decline" : "Declined"} </span>
                    </button>} */}

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
      field: "type",
      headerName: "Location",
      width: 100,
      // description: "Clinical Coordinator in the Hospital",
    },
    {
      field: "studyField",
      headerName: "Study Field",
      width: 300,
    },
    {
      field: "startDate",
      headerName: "StartDate",
      width: 100,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 100,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
      description: "Clinical Coordinator in the Hospital",
    },
    {
      field: "InstructorId",
      headerName: "Instructor",
      width: 200,
      valueFormatter: (params) => {
        let found = allInstructors?.find((inst) => inst?.id == params.value);
        return `${found?.firstName} ${found?.middleName}`;
      },
    },
    {
      field: "count",
      headerName: "Day Count",
      width: 100,
      renderCell: (params) => {
        const now = moment();
        const end = moment(params?.row?.endDate);
        const diff = end.diff(now);
        if (diff < 0) {
          // Event has ended
          return (
            <div className="text-red-500">{`${Math.abs(
              end.diff(now, "days")
            )} days ago`}</div>
          );
        } else {
          return (
            <div className="text-green-500">{`${end.diff(
              now,
              "days"
            )} days left`}</div>
          );
        }
      },
    },
    {
      field: "onExtension",
      headerName: "On Extention",
      width: 200,
      renderCell: (params) => {
        // console.log(params);
        if (params?.row?.onExtension == true) {
          return (
            <div className="text-green-500">
              {/* {new String(params?.row?.isExtended)} */}
              YES
            </div>
          );
        } else {
          return (
            <div className="text-red-500">
              {/* {new String(params?.row?.isExtended)} */}
              NO
            </div>
          );
        }
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
      type: "",
      studyField: "",
      startDate: "",
      endDate: "",
      InstructorId: "",
    },

    validationSchema: Yup.object({
      type: Yup.string().required("please enter the education site"),
      studyField: Yup.string().required("please enter the study field"),
      startDate: Yup.string().required("please enter the start date"),
      endDate: Yup.string().required("please enter the end date"),
      InstructorId: Yup.string().required(
        "please select the instructor applying the leave"
      ),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post("/on-education", values)
        .then((data) => {
          toast.success("education status Created Successfully", {
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
          fetchAllData("/on-education");
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
                  Staffs on Education 🔖
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                {/* <SearchForm placeholder="Search by Instructor" /> */}
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
                    Create Education Status
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
                        fetchAllData("/on-education");
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
                          Education Status
                        </h1>

                        <form onSubmit={formik.handleSubmit}>
                          <div className="space-y-4">
                            {/* Type/location */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="type"
                              >
                                Location
                              </label>
                              <select
                                name="type"
                                id="type"
                                className="form-input w-full overflow-y-scroll"
                                autoComplete="on"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.type}
                              >
                                <option value="">
                                  -- select Location Type --
                                </option>
                                <>
                                  {["Abroad", "Domestic"].map((lv, i) => {
                                    return (
                                      <option key={i} value={lv}>
                                        {lv}
                                      </option>
                                    );
                                  })}
                                </>
                              </select>
                              {formik.touched.type && formik.errors.type ? (
                                <div className="text-red-600">
                                  {formik.errors.type}
                                </div>
                              ) : null}
                            </div>
                            {/* study field */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="studyField"
                              >
                                Study Field
                              </label>
                              <input
                                id="studyField"
                                name="studyField"
                                className="form-input w-full"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.studyField}
                              />
                              {formik.touched.from &&
                              formik.errors.studyField ? (
                                <div className="text-red-600">
                                  {formik.errors.studyField}
                                </div>
                              ) : null}
                            </div>
                            {/* start Date*/}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="startDate"
                              >
                                Start Date
                              </label>
                              <input
                                id="startDate"
                                name="startDate"
                                className="form-input w-full"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.startDate}
                              />
                              {formik.touched.to && formik.errors.startDate ? (
                                <div className="text-red-600">
                                  {formik.errors.startDate}
                                </div>
                              ) : null}
                            </div>
                            {/* end Date */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="endDate"
                              >
                                End Date
                              </label>
                              <input
                                id="endDate"
                                name="endDate"
                                className="form-input w-full"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.endDate}
                              />
                              {formik.touched.endDate &&
                              formik.errors.endDate ? (
                                <div className="text-red-600">
                                  {formik.errors.endDate}
                                </div>
                              ) : null}
                            </div>
                            {/* Instructor */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="InstructorId"
                              >
                                Instructor on Education
                              </label>
                              <select
                                name="InstructorId"
                                id="InstructorId"
                                className="form-input w-full overflow-y-scroll"
                                autoComplete="on"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.InstructorId}
                              >
                                <option value="">
                                  -- select instructor --
                                </option>
                                <>
                                  {allInstructors?.map((dept) => {
                                    return (
                                      <option key={dept.id} value={dept.id}>
                                        {dept.firstName} {dept.middleName}{" "}
                                        {dept.lastName}
                                      </option>
                                    );
                                  })}
                                </>
                              </select>
                              {formik.touched.InstructorId &&
                              formik.errors.InstructorId ? (
                                <div className="text-red-600">
                                  {formik.errors.InstructorId}
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
                                "Create Education Status"
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
                  education={education}
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
                    getRowId={(row) => row?.id}
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

export default LeaveList;
