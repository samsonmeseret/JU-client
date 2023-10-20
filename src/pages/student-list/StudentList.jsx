import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Link } from "react-router-dom";
import { ProgressBar, RotatingLines } from "react-loader-spinner";
import { axiosInstance } from "../../api/axios";
import useFetch from "../../customHooks/useFetch";
import moment from "moment";
import Swal from "sweetalert2";

const StudentsList = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [file, setFile] = useState({
    file: {},
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  //   const [isFetching, setIsFetching] = useState(false);
  const { fetchAllData, result, isLoading: isFetching } = useFetch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log(result);
  const fileHandler = (e) => {
    setFile((prev) => {
      return {
        file: e.target.files[0],
        name: e.target.files[0].name,
      };
    });
  };

  const deleteHandler = (plan) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${plan.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/student-file/${plan.id}?userId=${plan.UserId}`)
          .then((data) => {
            console.log(data);
            if (data?.data?.status == false) {
              return Swal.fire(
                "Not Permitted",
                `${data?.data?.message}`,
                "error"
              );
            }
            Swal.fire("Deleted!", "Students list has been deleted.", "success");
            fetchAllData("/student-file");
          });
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("name", file.name);
    formData.append("file", file.file);
    setIsLoading(true);
    axiosInstance
      .post("/student-file", formData)
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setFile((prev) => {
          return {
            ...prev,
            file: {},
            name: "",
          };
        });
        fetchAllData("/student-file");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllData("/student-file");
  }, []);
  //   console.log(file);

  return (
    <section className="h-[85vh] mt-5">
      <div className=" ml-5 mb-2 flex ">
        <form action="" className="flex gap-1" onSubmit={submitHandler}>
          <div class=" input_field flex items-center justify-center w-max mx-auto text-center">
            <label>
              <input
                class="text-sm cursor-pointer w-36 hidden"
                type="file"
                onChange={fileHandler}
              />
              <div class="text flex gap-3 items-center bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                {file?.name ? (
                  <div className="flex gap-2">
                    <DoneAllIcon />
                    <span>file selected</span>
                  </div>
                ) : (
                  <span>select students list file</span>
                )}
              </div>
            </label>

            {file?.name && (
              <span className="hover:text-red-500">
                <DeleteOutlineIcon
                  onClick={() =>
                    setFile(() => {
                      return {
                        file: {},
                        name: "",
                      };
                    })
                  }
                />
              </span>
            )}
          </div>
          {file?.name && (
            <div className="flex">
              {isLoading ? (
                <span className="flex gap-3 items-center justify-center p-0 m-0">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                  />
                  <span className="font-semibold text-gray-400">
                    In progress
                  </span>
                </span>
              ) : (
                <button
                  className="border bottom-1  font-semibold flex gap-2 justify-center items-center text-blue-500 hover:text-white hover:bg-blue-500 ease-in duration-500 py-1 px-3 rounded-full border-blue-500"
                  type="submit"
                  disabled={isLoading ? true : false}
                  //   onClick={submitHandler}
                >
                  <div className="flex gap-2">
                    <svg
                      class="text-indigo-200 w-5 mx-auto "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span>upload now</span>
                  </div>
                </button>
              )}
            </div>
          )}
        </form>
      </div>
      <div className="mx-5">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Students Lists
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              plans for every years
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails>
            {isFetching ? (
              <h3>fetching data ...</h3>
            ) : (
              <>
                {result?.length == 0 && <p>No students list uploaded yet.</p>}
                {result?.map((plan) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between hover:bg-gray-200 mb-[-5px] py-2 px-3 rounded-3xl">
                      <Link to={plan.link} target="_blank" download={true}>
                        <div className="flex gap-80">
                          <div className="flex gap-5">
                            <PictureAsPdfIcon />
                            <span>{plan.name}</span>
                          </div>
                        </div>
                      </Link>
                      <div
                        onClick={() => deleteHandler(plan)}
                        className="hover:text-red-500"
                      >
                        <DeleteOutlineIcon />
                      </div>
                    </div>
                    <span className="ml-16 text-gray-600 text-sm">
                      uploaded by
                      <span className="pl-2">
                        {plan?.User?.firstName} {plan?.User?.lastName}
                      </span>
                    </span>
                    <small className="ml-16">
                      {moment(plan.createdAt, "YYYYMMDD").fromNow()}
                    </small>
                  </div>
                ))}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
};

export default StudentsList;
