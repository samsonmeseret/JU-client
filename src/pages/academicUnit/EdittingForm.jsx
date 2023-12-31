import React from "react";
import useFetch from "../../customHooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import { Box, Modal } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const EdittingForm = ({
    setEditing,
    isEditing,
    unit,
    setIsLoading,
    isLoading,
}) => {
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
    const dispatch = useDispatch()



    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: unit?.name,
        },

        validationSchema: Yup.object({
            name: Yup.string().required("please enter the unit name"),
        }),
        onSubmit: (values) => {


            axiosInstance
                .patch(`/units/${unit?.id}`, values)
                .then((data) => {


                    toast.success("unit Updated Successfully", {
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
                    <div className="ml-auto" onClick={() => setEditing(false)}>
                        <GrClose className="ml-auto" />
                    </div>
                    <h1 className="mx-auto text-center text-lg">unit Info</h1>

                    <section>
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            className="block text-sm font-medium mb-1"
                                            htmlFor="name"
                                        >
                                            unit Name
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

                                </div>
                                <div className="flex items-center justify-center mt-6">
                                    <button
                                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                                        type="submit"
                                    >
                                        {isLoading ? (
                                            <CompLoader height={"20px"} color="#ffffff" />
                                        ) : (
                                            "Update unit "
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
