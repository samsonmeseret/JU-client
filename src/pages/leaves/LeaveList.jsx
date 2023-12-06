import React, { useState, useMemo, useEffect, useCallback } from "react";
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

import { swap, useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import EdittingForm from "./EdittingForm";
import { useSelector, useDispatch } from "react-redux";
import {
  getLeaves,
  getInstructors,
  getAllInstructors,
  getUsers,
} from "../../Redux/reducers/dataSlice";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import ViewOnlyCalendar from "../Calender/ViewOnlyCalender";

function LeaveList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [leave, setLeave] = useState({});
  const [openLeave, setOpenLeave] = useState(false);

  const dispatch = useDispatch();
  // const { fetchAllData } = useFetch();
  const { allInstructors, userList, leaveList, isLoading } = useSelector(
    (state) => state.deptData
  );
  const { user, isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllInstructors());

    if (!leaveList || leaveList?.length == 0) dispatch(getLeaves());
    if (!userList || userList?.length == 0) dispatch(getUsers());
  }, []);

  function getEvents(inputArray) {
    return inputArray?.map((item) => ({
      title: `${item.Instructor.firstName} ${item.Instructor.lastName} (${item.status})`,
      start: item.from,
      end: item.to,
    }));
  }

  function ActionBtn({ params, rowId }) {
    let leaveSelected = params.row;

    const editHandler = (data) => {
      // console.log(params.row);
      setLeave(params.row);
      setIsEditing(true);
    };
    const declineHandler = useCallback(() => {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to Decline this Request`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Decline!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance
            .patch(`/leaves/${params?.row?.id}/decline`, {
              status: "declined",
            })
            .then((data) => {
              if (data?.data?.status == "failed") {
                return Swal.fire("Failed!", `${data?.data?.message}`, "error");
              }
              Swal.fire("Declined!", "Request has been Declined.", "success");
              dispatch(getLeaves());
            });
        }
      });
      // setLeave(leaveSelected)
      // setOpen(false);
      // setIsEditing(true);
    }, [leaveSelected]);

    const deleteHandler = useCallback(() => {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete this Request`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/leaves/${leaveSelected.id}`).then(() => {
            Swal.fire("Deleted!", "Request has been deleted.", "success");
            dispatch(getLeaves());
          });
        }
      });
    }, [leaveSelected]);
    const approveHandler = useCallback(() => {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to Approve this Request`,
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance
            .patch(`/leaves/${leaveSelected.id}/approve`, {
              status: "approved",
            })
            .then((data) => {
              if (data?.data?.status == "failed") {
                return Swal.fire("Failed!", `${data?.data?.message}`, "error");
              }
              Swal.fire("Approved!", "Request has been Approved.", "success");
              dispatch(getLeaves());
            });
        }
      });
    }, [leave]);

    return (
      <>
        <section className="flex gap-2 ">
          {user?.role == "dean" && leaveSelected?.status != "declined" && (
            <button
              style={{ borderRadius: "7px" }}
              // to={`${specialization.id}`}
              onClick={
                leaveSelected?.status == "pending" ? approveHandler : null
              }
              className={
                leaveSelected?.status == "pending"
                  ? "p-3 text-green-700  hover:outline outline-1 outline-blue-600 cursor-pointer "
                  : "p-3 text-red-600-700   "
              }
            >
              <span className="">
                {" "}
                {leaveSelected?.status == "pending"
                  ? "Approve"
                  : "Approved"}{" "}
              </span>
            </button>
          )}
          {user?.role == "dean" && leaveSelected?.status != "approved" && (
            <button
              style={{ borderRadius: "7px" }}
              // to={`${specialization.id}`}
              onClick={
                leaveSelected?.status == "pending" ? declineHandler : null
              }
              className={
                leaveSelected?.status == "pending"
                  ? "p-3 text-green-700  hover:outline outline-1 outline-blue-600 cursor-pointer "
                  : "p-3 text-red-600-700   "
              }
            >
              <span className="">
                {" "}
                {leaveSelected?.status == "pending" &&
                leaveSelected.status != "approved" &&
                leaveSelected.status != "declined"
                  ? "Decline"
                  : "Declined"}{" "}
              </span>
            </button>
          )}

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
  const closeCalender = () => setOpenLeave(false);
  const column = useMemo(() => [
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 250,
      renderCell: (params) => (
        <ActionBtn onClick={(e) => {}} {...{ params, rowId, setRowId }} />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      description: "Clinical Coordinator in the Hospital",
    },
    {
      field: "leaveType",
      headerName: "Request Type",
      width: 170,
    },
    {
      field: "from",
      headerName: "From",
      width: 100,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "to",
      headerName: "To",
      width: 100,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
      description: "Clinical Coordinator in the Hospital",
    },
    {
      field: "totalDay",
      headerName: "Total Day",
      width: 120,
      description: "Clinical Coordinator in the Hospital",
    },

    {
      field: "reason",
      headerName: "Reason",
      width: 200,
      description: "Clinical Coordinator in the Hospital",
    },
    {
      field: "InstructorId",
      headerName: "Instructor",
      width: 170,
      valueFormatter: (params) => {
        let found = allInstructors?.find((inst) => inst?.id == params.value);
        return `${found?.firstName} ${found?.middleName}`;
      },
    },
    user?.role == "dean" &&
      userList?.length != 0 && {
        field: "UserId",
        headerName: "Applied By",
        width: 170,
        valueFormatter: (params) => {
          let found = userList?.find((user) => user?.id == params.value);
          return `${found?.firstName} ${found?.middleName}`;
        },
      },
    {
      headerName: "Day Count",
      width: 200,
      renderCell: (params) => {
        const now = moment();
        const end = moment(params?.row?.to);
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

  const calStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // maxWidth: 800,
    maxHeight: "100vh",
    overflowY: "scroll",
    // width: "80%",
    minWidth: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "7px",
    boxShadow: 24,
    p: 4,
  };

  const formik = useFormik({
    initialValues: {
      leaveType: "",
      from: "",
      to: "",
      totalDay: "",
      status: "",
      reason: "",
      InstructorId: "",
    },

    validationSchema: Yup.object({
      leaveType: Yup.string().required("please enter the request type"),
      from: Yup.string().required("please select the request starting date"),
      to: Yup.string().required("please select the request ending date"),
      totalDay: Yup.string().required("please enter the total day in number"),
      reason: Yup.string().required("please enter the reason for a request"),
      InstructorId: Yup.string().required(
        "please select the instructor applying the request"
      ),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post("/leaves", values)
        .then((data) => {
          toast.success("Request Created Successfully", {
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
          dispatch(getLeaves());
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
      <Modal
        open={openLeave}
        onClose={closeCalender}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={calStyle}>
          <section>
            <div>
              <div
                className="ml-auto w-20 text-red-500 bg-red-50 rounded-md hover:bg-red-200 cursor-pointer ease-in duration-200 hover:text-red-900 p-1 flex justify-center "
                onClick={closeCalender}
              >
                {/* <GrClose /> */}
                <span>close </span>
              </div>
              {/* <div className="ml-auto" onClick={closeCalender}>
                <GrClose className="ml-auto" />
              </div> */}

              <section>
                <ViewOnlyCalendar name="Leave" events={getEvents(leaveList)} />
              </section>
            </div>
          </section>
        </Box>
      </Modal>
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Requests
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                {/* <SearchForm placeholder="Search by Leave" /> */}
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
                  <span className="hidden xs:block ml-2">Create Request</span>
                </button>
              </div>
            </div>

            {/* More actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left side */}
              <div className="mb-4 sm:mb-0">
                <ul className="flex flex-wrap -m-1 items-center gap-3">
                  <li className="m-1">
                    <button
                      onClick={() => {
                        dispatch(getLeaves());
                      }}
                      className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out"
                    >
                      Refresh <span className="ml-1 text-indigo-200">🔃</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setOpenLeave(true)}
                      className="hover:text-white hover:bg-gray-700 rounded-full px-3 py-1 text-gray-700 bg-gray-100 duration-300 ease-in"
                    >
                      Open in Calender
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
                          Request Info
                        </h1>

                        <form onSubmit={formik.handleSubmit}>
                          <div className="space-y-4">
                            {/* leave Type */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="leaveType"
                              >
                                Request Type
                              </label>
                              <select
                                name="leaveType"
                                id="leaveType"
                                className="form-input w-full"
                                autoComplete="on"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.leaveType}
                              >
                                <option value="">
                                  -- select Request Type --
                                </option>
                                <>
                                  {[
                                    "Annual Leave",
                                    "Sick Leave",
                                    "Study Leave",
                                    "Compassionate Leave",
                                    "Maternity Leave",
                                    "Paternity Leave",
                                    "Domestic Violence Leave",
                                  ].map((lv, i) => {
                                    return (
                                      <option key={i} value={lv}>
                                        {lv}
                                      </option>
                                    );
                                  })}
                                </>
                              </select>
                              {formik.touched.leaveType &&
                              formik.errors.leaveType ? (
                                <div className="text-red-600">
                                  {formik.errors.leaveType}
                                </div>
                              ) : null}
                            </div>
                            {/* From */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="from"
                              >
                                From
                              </label>
                              <input
                                id="from"
                                name="from"
                                className="form-input w-full"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.from}
                              />
                              {formik.touched.from && formik.errors.from ? (
                                <div className="text-red-600">
                                  {formik.errors.from}
                                </div>
                              ) : null}
                            </div>
                            {/* To */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="to"
                              >
                                To
                              </label>
                              <input
                                id="to"
                                name="to"
                                className="form-input w-full"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.to}
                              />
                              {formik.touched.to && formik.errors.to ? (
                                <div className="text-red-600">
                                  {formik.errors.to}
                                </div>
                              ) : null}
                            </div>
                            {/* Total Day */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="totalDay"
                              >
                                Total Requested Days
                              </label>
                              <input
                                id="totalDay"
                                name="totalDay"
                                className="form-input w-full"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.totalDay}
                              />
                              {formik.touched.totalDay &&
                              formik.errors.totalDay ? (
                                <div className="text-red-600">
                                  {formik.errors.totalDay}
                                </div>
                              ) : null}
                            </div>
                            {/* Reason */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="reason"
                              >
                                Reason
                              </label>
                              <textarea
                                rows={3}
                                id="reason"
                                name="reason"
                                className="form-input w-full"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.reason}
                              />
                              {formik.touched.reason && formik.errors.reason ? (
                                <div className="text-red-600">
                                  {formik.errors.reason}
                                </div>
                              ) : null}
                            </div>
                            {/* Instructor */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="InstructorId"
                              >
                                Instructor Applying
                              </label>
                              <select
                                name="InstructorId"
                                id="InstructorId"
                                className="form-input w-full"
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
                                "Create Request"
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
                  leave={leave}
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
                    rows={leaveList}
                    getRowId={(row) => row.id}
                    slots={{
                      toolbar: CustomToolbar,
                    }}
                    // checkboxSelection
                    loading={isLoading}
                    disableRowSelectionOnClick
                    {...leaveList}
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
