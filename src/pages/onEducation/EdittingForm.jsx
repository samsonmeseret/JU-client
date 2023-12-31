import React, { useEffect, useState } from "react";
import useFetch from "../../customHooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import { Box, Modal } from "@mui/material";
// import { GrClose } from "react-icons/gr";
import {
  getInstructors,
  getAllInstructors,
} from "../../Redux/reducers/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const EdittingForm = ({ setEditing, isEditing, education }) => {
  const dispatch = useDispatch();
  const { instructorList, allInstructors, isLoading } = useSelector(
    (state) => state.deptData
  );
  const [currentInst, setCurrentInst] = useState();
  const { user, isAuth } = useSelector((state) => state.auth);
  // console.log(education);
  // console.log(user);

  useEffect(() => {
    // if (!instructorList || instructorList?.length == 0) {
    dispatch(getAllInstructors());
    // }
    // getAllInstructors();
    // if (user.role == "dean") {
    //   let filteredInst = allInstructors.filter(
    //     (item) => item.DepartmentId == item.DepartmentId
    //   );
    //   setCurrentInst(filteredInst);
    //   console.log(filteredInst);
    // } else {
    //   setCurrentInst(allInstructors);
    // }
  }, []);

  const {
    fetchAllData,
    fetchSingleData,
    postData,
    updateData,
    deleteSelectedData,
    deleteSingleData,
  } = useFetch();
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
      type: education?.type,
      studyField: education?.studyField,
      startDate: moment(education?.startDate).format("YYYY-MM-DD"),
      endDate: moment(education?.endDate).format("YYYY-MM-DD"),
      InstructorId: education?.InstructorId,
      onExtension: education?.onExtension,
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
      // console.log(values);
      axiosInstance
        .patch("/on-education/" + education.id, values)
        .then((data) => {
          toast.success("education status Updated Successfully", {
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
            <span>close </span>
          </div>

          <h1 className="mx-auto text-center text-lg">Education Status Info</h1>

          <section>
            <div>
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
                      <option value="">-- select Location Type --</option>
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
                      <div className="text-red-600">{formik.errors.type}</div>
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
                    {formik.touched.from && formik.errors.studyField ? (
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
                    {formik.touched.endDate && formik.errors.endDate ? (
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
                      {/* {currentInst?.map((item) => {
                        item.id == formik.values.InstructorId ? ( */}
                      <option value="">-- select instructor --</option>
                      {/* ) : null;
                      })} */}
                      <>
                        {allInstructors?.map((dept, i) => {
                          return (
                            <option key={i} value={dept.id}>
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
                  <div className="flex gap-3 justify-center items-center">
                    <input
                      id="onExtension"
                      name="onExtension"
                      type="checkbox"
                      value={formik?.values?.onExtension}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultChecked={education?.onExtension}
                    />
                    <label htmlFor="onExtension"> onExtension </label>
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
                      "Update Education Status"
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
