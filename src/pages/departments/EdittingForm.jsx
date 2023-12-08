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
import moment from "moment";

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
    maxWidth: "100%",
    maxHeight: "100vh",
    overflowY: "scroll",
    width: 700,
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
      // head
      departmentHead: department?.departmentHead,
      departmentHeadRole: department?.departmentHeadRole,
      departmentHeadAppointedDate: moment(
        department?.departmentHeadAppointedDate
      ).format("YYYY-MM-DD"),
      // acc vise head
      viseDepartmentHeadForAccademic:
        department?.viseDepartmentHeadForAccademic,
      viseDepartmentHeadForAccademicRole:
        department?.viseDepartmentHeadForAccademicRole,
      viseDepartmentHeadForAccademicAppointedDate: moment(
        department?.viseDepartmentHeadForAccademicAppointedDate
      ).format("YYYY-MM-DD"),
      //clin vise head
      viseDepartmentHeadForClinical: department?.viseDepartmentHeadForClinical,
      viseDepartmentHeadForClinicalRole:
        department?.viseDepartmentHeadForClinicalRole,
      viseDepartmentHeadForClinicalAppointedDate: moment(
        department?.viseDepartmentHeadForClinicalAppointedDate
      ).format("YYYY-MM-DD"),
    },

    validationSchema: Yup.object({
      name: Yup.string().required("please enter the department name"),
      departmentHead: Yup.string().required("please enter the department head"),
      departmentHeadRole: Yup.string().required(
        "please enter the department head roles"
      ),
      departmentHeadAppointedDate: Yup.string().required(
        "please enter the Appointed Date"
      ),
      viseDepartmentHeadForAccademic: Yup.string().required(
        "please enter the vise Department Head for Accadamic"
      ),
      viseDepartmentHeadForAccademicRole: Yup.string().required(
        "please enter the vise Department Head for Accadamic Role"
      ),
      viseDepartmentHeadForAccademicAppointedDate: Yup.string().required(
        "please enter the vise Department Head for Accadamic Appointed date"
      ),
      viseDepartmentHeadForClinical: Yup.string().required(
        "please enter the vise Department Head for Clinical"
      ),
      viseDepartmentHeadForClinicalRole: Yup.string().required(
        "please enter the vise Department Head for Clinical Role"
      ),
      viseDepartmentHeadForClinicalAppointedDate: Yup.string().required(
        "please enter the vise Department Head for Clinical Appointed date"
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
            onClick={() => {
              formik.resetForm();
              setEditing(false);
            }}
          >
            {/* <GrClose /> */}
            <span>close </span>
          </div>

          <h1 className="mx-auto text-center text-lg">Department Info</h1>

          <section>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
                  {/* name */}
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
                  {/* department head */}
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
                  {/* department head role*/}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="departmentHeadRole"
                    >
                      Department Head Roles
                    </label>
                    <textarea
                      rows={5}
                      id="departmentHeadRole"
                      className="form-input w-full"
                      type="text"
                      name="departmentHeadRole"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.departmentHeadRole}
                    />
                    {formik.touched.departmentHeadRole &&
                    formik.errors.departmentHeadRole ? (
                      <div className="text-red-600">
                        {formik.errors.departmentHeadRole}
                      </div>
                    ) : null}
                  </div>
                  {/* dpt head appointed date */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="departmentHeadAppointedDate"
                    >
                      Department Head Appointed Date
                    </label>
                    <input
                      id="departmentHeadAppointedDate"
                      className="form-input w-full"
                      type="date"
                      name="departmentHeadAppointedDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.departmentHeadAppointedDate}
                    />
                    {formik.touched.departmentHeadAppointedDate &&
                    formik.errors.departmentHeadAppointedDate ? (
                      <div className="text-red-600">
                        {formik.errors.departmentHeadAppointedDate}
                      </div>
                    ) : null}
                  </div>
                  {/* vise dpt departmet for accademic */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="viseDepartmentHeadForAccademic"
                    >
                      Vise Department Head for Accademic
                    </label>
                    <input
                      id="viseDepartmentHeadForAccademic"
                      className="form-input w-full"
                      type="text"
                      name="viseDepartmentHeadForAccademic"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.viseDepartmentHeadForAccademic}
                    />
                    {formik.touched.viseDepartmentHeadForAccademic &&
                    formik.errors.viseDepartmentHeadForAccademic ? (
                      <div className="text-red-600">
                        {formik.errors.viseDepartmentHeadForAccademic}
                      </div>
                    ) : null}
                  </div>
                  {/* accedemic roles */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="viseDepartmentHeadForAccademicRole"
                    >
                      Vise Department Head Roles for Accademic
                    </label>
                    <textarea
                      rows={5}
                      id="viseDepartmentHeadForAccademicRole"
                      className="form-input w-full"
                      type="text"
                      name="viseDepartmentHeadForAccademicRole"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.viseDepartmentHeadForAccademicRole}
                    />
                    {formik.touched.viseDepartmentHeadForAccademicRole &&
                    formik.errors.viseDepartmentHeadForAccademicRole ? (
                      <div className="text-red-600">
                        {formik.errors.viseDepartmentHeadForAccademicRole}
                      </div>
                    ) : null}
                  </div>
                  {/* accedamic appointed date */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="viseDepartmentHeadForAccademicAppointedDate"
                    >
                      Vise Department Head Appointed Date for Accademic
                    </label>
                    <input
                      id="viseDepartmentHeadForAccademicAppointedDate"
                      className="form-input w-full"
                      type="date"
                      name="viseDepartmentHeadForAccademicAppointedDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values
                          .viseDepartmentHeadForAccademicAppointedDate
                      }
                    />
                    {formik.touched
                      .viseDepartmentHeadForAccademicAppointedDate &&
                    formik.errors
                      .viseDepartmentHeadForAccademicAppointedDate ? (
                      <div className="text-red-600">
                        {
                          formik.errors
                            .viseDepartmentHeadForAccademicAppointedDate
                        }
                      </div>
                    ) : null}
                  </div>
                  {/* clinical head */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="viseDepartmentHeadForClinical"
                    >
                      Vise Department Head for Clinical
                    </label>
                    <input
                      id="viseDepartmentHeadForClinical"
                      className="form-input w-full"
                      type="text"
                      name="viseDepartmentHeadForClinical"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.viseDepartmentHeadForClinical}
                    />
                    {formik.touched.viseDepartmentHeadForClinical &&
                    formik.errors.viseDepartmentHeadForClinical ? (
                      <div className="text-red-600">
                        {formik.errors.viseDepartmentHeadForClinical}
                      </div>
                    ) : null}
                  </div>
                  {/* clinical head role*/}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="viseDepartmentHeadForClinicalRole"
                    >
                      Vise Department Head Roles for Clinical
                    </label>
                    <textarea
                      rows={5}
                      id="viseDepartmentHeadForClinicalRole"
                      className="form-input w-full"
                      type="text"
                      name="viseDepartmentHeadForClinicalRole"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.viseDepartmentHeadForClinicalRole}
                    />
                    {formik.touched.viseDepartmentHeadForClinicalRole &&
                    formik.errors.viseDepartmentHeadForClinicalRole ? (
                      <div className="text-red-600">
                        {formik.errors.viseDepartmentHeadForClinicalRole}
                      </div>
                    ) : null}
                  </div>
                  {/* clinical head appointed date*/}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="viseDepartmentHeadForClinicalAppointedDate"
                    >
                      Vise Department Head AppointedDate for Clinical
                    </label>
                    <input
                      id="viseDepartmentHeadForClinicalAppointedDate"
                      className="form-input w-full"
                      type="date"
                      name="viseDepartmentHeadForClinicalAppointedDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.viseDepartmentHeadForClinicalAppointedDate
                      }
                    />
                    {formik.touched
                      .viseDepartmentHeadForClinicalAppointedDate &&
                    formik.errors.viseDepartmentHeadForClinicalAppointedDate ? (
                      <div className="text-red-600">
                        {
                          formik.errors
                            .viseDepartmentHeadForClinicalAppointedDate
                        }
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
