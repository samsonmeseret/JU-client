import React, { useEffect } from "react";
import useFetch from "../../customHooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import { Box, Modal } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { getLeaves, getInstructors } from "../../Redux/reducers/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const EdittingForm = ({ setEditing, isEditing, leave }) => {
  const dispatch = useDispatch();
  const { instructorList, leaveList, isLoading } = useSelector(
    (state) => state.deptData
  );
  const { user, isAuth } = useSelector((state) => state.auth);

  console.log(leave);
  useEffect(() => {
    if (!instructorList || instructorList?.length == 0) {
      dispatch(getInstructors());
    }
    if (!leaveList || leaveList?.length == 0) dispatch(getLeaves());
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
      leaveType: leave?.leaveType,
      from: moment(leave?.from).format("YYYY-MM-DD"),
      to: moment(leave?.to).format("YYYY-MM-DD"),
      totalDay: leave?.totalDay,
      status: leave?.status,
      reason: leave?.reason,
      InstructorId: leave?.InstructorId,
    },

    validationSchema: Yup.object({
      leaveType: Yup.string().required("please enter the leave type"),
      from: Yup.string().required("please select the leave starting date"),
      to: Yup.string().required("please select the leave ending date"),
      totalDay: Yup.string().required("please enter the total day in number"),
      reason: Yup.string().required("please enter the reason for a leave"),
      InstructorId: Yup.string().required(
        "please select the instructor applying the leave"
      ),
    }),
    onSubmit: (values) => {
      axiosInstance
        .patch("/leaves/" + leave.id, values)
        .then((data) => {
          toast.success("Request Updated Successfully", {
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
          setEditing(false);
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
            <span>close</span>
          </div>
          <h1 className="mx-auto text-center text-lg">Request Info</h1>

          <section>
            <div>
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
                      value={formik?.values?.leaveType}
                    >
                      <option value="">-- select Request Type --</option>
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
                    {formik.touched.leaveType && formik.errors.leaveType ? (
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
                      value={formik?.values?.from}
                    />
                    {formik.touched.from && formik.errors.from ? (
                      <div className="text-red-600">{formik.errors.from}</div>
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
                      value={formik?.values?.to}
                    />
                    {formik.touched.to && formik.errors.to ? (
                      <div className="text-red-600">{formik.errors.to}</div>
                    ) : null}
                  </div>
                  {/* Total Day */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="totalDay"
                    >
                      Total Request Days
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
                    {formik.touched.totalDay && formik.errors.totalDay ? (
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
                      <div className="text-red-600">{formik.errors.reason}</div>
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
                      <option value="">-- select instructor --</option>
                      <>
                        {instructorList?.map((dept) => {
                          return (
                            <option key={dept.id} value={dept.id}>
                              {dept.firstName} {dept.middleName} {dept.lastName}
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
                      "Update Request"
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
