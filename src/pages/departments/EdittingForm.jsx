import React from "react";
import useFetch from "../../customHooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import { Box, Modal } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { getDepartments } from "../../Redux/reducers/dataSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const EdittingForm = ({
  setEditing,
  isEditing,
  department,
  setIsLoading,
  isLoading,
}) => {
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
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: department?.name,
      departmentHead: department?.departmentHead,
      academicCoordinator: department?.academicCoordinator,
      clinicalCoordinator: department?.clinicalCoordinator,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("please enter the department name"),
      academicCoordinator: Yup.string().required(
        "please enter the academic coordinator"
      ),
      departmentHead: Yup.string().required("please enter the department head"),
      clinicalCoordinator: Yup.string().required(
        "please enter the clinical coordinator"
      ),
    }),
    onSubmit: (values) => {
      axiosInstance
        .patch(`/departments/${department.id}`, values)
        .then((data) => {
          toast.success("Department Updated Successfully", {
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
          //   setOpen(false);
          setEditing(false);
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
          setEditing(false);
        });
      //   dispatch(getDepartments());
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

          <h1 className="mx-auto text-center text-lg">Department Info</h1>

          <section>
            <div>
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
                      <div className="text-red-600">{formik.errors.name}</div>
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
                      "Update Department "
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
