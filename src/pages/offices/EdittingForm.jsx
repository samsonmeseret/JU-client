import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import { Box, Modal } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import useFetch from "../../customHooks/useFetch";
import moment from "moment";

const EdittingForm = ({ setEditing, isEditing, office }) => {
  const { fetchAllData, result, isLoading } = useFetch();

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
      name: office?.name,
      coordinator: office?.coordinator,
      majorActivity: office?.majorActivity,
      appointedDate: moment(office?.appointedDate).format("YYYY-MM-DD"),
    },

    validationSchema: Yup.object({
      name: Yup.string().required("please enter the office name"),
      coordinator: Yup.string().required("please provide the coordinator"),
      majorActivity: Yup.string().required("please provide the major activity"),
      appointedDate: Yup.string().required("please provide the appointed sate"),
    }),
    onSubmit: (values) => {
      //   console.log(values);
      axiosInstance
        .patch("/offices/" + office.id, values)
        .then((data) => {
          toast.success("Office Updated Successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // fetchAllData("/offices")
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
      // dispatch(getDepartments());
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

          <h1 className="mx-auto text-center text-lg">Office Info</h1>

          <section>
            <div>
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
                      <div className="text-red-600">{formik.errors.name}</div>
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
                    {formik.touched.coordinator && formik.errors.coordinator ? (
                      <div className="text-red-600">
                        {formik.errors.coordinator}
                      </div>
                    ) : null}
                  </div>
                  {/* major activities */}
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
                  {/* appointed date */}
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
                      "Update Office"
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
