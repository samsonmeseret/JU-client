import React, { useState } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
// import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
// import IconButton from "@mui/material/IconButton";
import Zoom from "@mui/material/Zoom";
import __ from "lodash";

const DataCard = ({ data }) => {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      minWidth: 220,
      maxHeight: 300,
      overflowY: "scroll",
      overflowX: "hidden",
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "#f5f5f9", // Set the arrow color to match the background color
    },
  }));

  return (
    <div>
      <a
        href="#"
        className="shadow-2xl bg-white relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 m-3"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4 relative">
          <div className=" rounded-lg shadow-2xl p-5 flex flex-col">
            <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
              On Education
            </h3>
            <div className="flex gap-5 justify-between">
              <div>
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.domesticOnEducationData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.domesticOnEducationData?.map((val) => (
                              <li>🩺 {val}</li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between gap-3">
                          <span>Domestic</span>{" "}
                          <span>{data?.domesticOnEducation}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between gap-3">
                        <span>Domestic</span>{" "}
                        <span>{data?.byRank?.domesticOnEducation}</span>
                      </p>
                    )}
                  </p>
                </div>

                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.abroadOnEducationData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.abroadOnEducationData?.map((val) => (
                              <li>🩺 {val}</li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between gap-3">
                          <span>Abroad</span>{" "}
                          <span>{data?.abroadOnEducation}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between gap-3">
                        <span>Abroad</span>{" "}
                        <span>{data?.abroadOnEducation}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* <div className="flex justify-between gap-5">
                  <span>Total</span>
                  <p>{data?.totalOnEducation}</p>
                </div> */}
              </div>
            </div>
          </div>
          {/* Academic Rank */}
          <div className="rounded-lg shadow-2xl p-5  flex flex-col">
            <h3 className="mb-3 text-lg font-bold  text-gray-900 sm:text-xl">
              By Academic Rank
            </h3>
            <div className="">
              <div className="flex flex-col justify-between">
                {/* graduate assistant I */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.graduateAssistantIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.graduateAssistantIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between gap-3">
                          <span>Graduate Assistant I</span>{" "}
                          <span>{data?.byRank?.graduateAssistantI}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between gap-3">
                        <span>Graduate Assistant I</span>{" "}
                        <span>{data?.byRank?.graduateAssistantI}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* graduate assistant ii */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.graduateAssistantIIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.graduateAssistantIIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>Graduate Assistant II</span>{" "}
                          <span>{data?.byRank?.graduateAssistantII}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>Graduate Assistant II</span>{" "}
                        <span>{data?.byRank?.graduateAssistantII}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* assistant lecturer */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.assistantLectureData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.assistantLectureData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>Assistant Lecture</span>{" "}
                          <span>{data?.byRank?.assistantLecture}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>Assistant Lecture</span>{" "}
                        <span>{data?.byRank?.assistantLecture}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* lecturer */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.lecturerData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.lecturerData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>Lecture</span>{" "}
                          <span>{data?.byRank?.lecturer}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>Lecture</span>{" "}
                        <span>{data?.byRank?.lecturer}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* technical Assistance */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.technicalAssistanceIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.technicalAssistanceIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>Technical Assistance I</span>{" "}
                          <span>{data?.byRank?.technicalAssistanceI}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>Technical Assistance I</span>{" "}
                        <span>{data?.byRank?.technicalAssistanceI}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* technical assistance II */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.technicalAssistanceIIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.technicalAssistanceIIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span> Technical Assistance II</span>{" "}
                          <span>{data?.byRank?.technicalAssistanceII}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span> Technical Assistance II</span>{" "}
                        <span>{data?.byRank?.technicalAssistanceII}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* technical assistance III */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.technicalAssistanceIIIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.technicalAssistanceIIIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span> Technical Assistance III</span>{" "}
                          <span>{data?.byRank?.technicalAssistanceIII}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span> Technical Assistance III</span>{" "}
                        <span>{data?.byRank?.technicalAssistanceIII}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/*  Senior Technical Assistant I */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.seniorTechnicalAssistantIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.seniorTechnicalAssistantIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between gap-5">
                          <span> Senior Technical Assistant I</span>{" "}
                          <span>{data?.byRank?.seniorTechnicalAssistantI}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between gap-5">
                        <span> Senior Technical Assistant I</span>{" "}
                        <span>{data?.byRank?.seniorTechnicalAssistantI}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/*  Senior Technical Assistant II */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.seniorTechnicalAssistantIIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.seniorTechnicalAssistantIIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span> Senior Technical Assistant II</span>{" "}
                          <span>
                            {data?.byRank?.seniorTechnicalAssistantII}
                          </span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span> Senior Technical Assistant II</span>{" "}
                        <span>{data?.byRank?.seniorTechnicalAssistantII}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/*  Senior Technical Assistant III */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.seniorTechnicalAssistantIIIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.seniorTechnicalAssistantIIIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span> Senior Technical Assistant III</span>{" "}
                          <span>
                            {data?.byRank?.seniorTechnicalAssistantIII}
                          </span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span> Senior Technical Assistant III</span>{" "}
                        <span>{data?.byRank?.seniorTechnicalAssistantIII}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/*  Chief Technical Assistant I */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.chiefTechnicalAssistantIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.chiefTechnicalAssistantIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span> Chief Technical Assistant I</span>{" "}
                          <span>{data?.byRank?.chiefTechnicalAssistantI}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span> Chief Technical Assistant I</span>{" "}
                        <span>{data?.byRank?.chiefTechnicalAssistantI}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/*  Chief Technical Assistant II */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.chiefTechnicalAssistantIIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.chiefTechnicalAssistantIIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span> Chief Technical Assistant II</span>{" "}
                          <span>{data?.byRank?.chiefTechnicalAssistantII}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span> Chief Technical Assistant II</span>{" "}
                        <span>{data?.byRank?.chiefTechnicalAssistantII}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/*  Chief Technical Assistant III */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.chiefTechnicalAssistantIIIData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.chiefTechnicalAssistantIIIData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span> Chief Technical Assistant III</span>{" "}
                          <span>
                            {data?.byRank?.chiefTechnicalAssistantIII}
                          </span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span> Chief Technical Assistant III</span>{" "}
                        <span>{data?.byRank?.chiefTechnicalAssistantIII}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/*   Assistant Professor */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.assistanceProfessorData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.assistanceProfessorData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span> Assistant Professor</span>{" "}
                          <span>{data?.byRank?.assistanceProfessor}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span> Assistant Professor</span>{" "}
                        <span>{data?.byRank?.assistanceProfessor}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* Associate Professor */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.associateProfessorData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.associateProfessorData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span> Associate Professor</span>{" "}
                          <span>{data?.byRank?.associateProfessor}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span> Associate Professor</span>{" "}
                        <span>{data?.byRank?.associateProfessor}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* professor */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byRank?.professorData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byRank?.professorData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span> Professor</span>{" "}
                          <span>{data?.byRank?.professor}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span> Professor</span>{" "}
                        <span>{data?.byRank?.professor}</span>
                      </p>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Educational Level */}
          <div className="rounded-lg shadow-2xl p-5 flex flex-col">
            <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
              By Educational Level
            </h3>
            <div className=" ">
              <div className="flex flex-col justify-between">
                {/* BSc */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byEducationalLevel?.BSCData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byEducationalLevel?.BSCData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>BSC</span>{" "}
                          <span>{data?.byEducationalLevel?.BSC}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>BSC</span>{" "}
                        <span>{data?.byEducationalLevel?.BSC}</span>
                      </p>
                    )}
                  </p>
                </div>
                <div>
                  {/* MD */}
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byEducationalLevel?.MDData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byEducationalLevel?.MDData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>MD</span>{" "}
                          <span>{data?.byEducationalLevel?.MD}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>MD</span>{" "}
                        <span>{data?.byEducationalLevel?.MD}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* DMD */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byEducationalLevel?.DMDData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byEducationalLevel?.DMDData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>DMD</span>{" "}
                          <span>{data?.byEducationalLevel?.DMD}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>DMD</span>{" "}
                        <span>{data?.byEducationalLevel?.DMD}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* MSC */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byEducationalLevel?.MSCData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byEducationalLevel?.MSCData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>MSC</span>{" "}
                          <span>{data?.byEducationalLevel?.MSC}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>MSC</span>{" "}
                        <span>{data?.byEducationalLevel?.MSC}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* PHD */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byEducationalLevel?.PHDData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byEducationalLevel?.PHDData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>PHD</span>{" "}
                          <span>{data?.byEducationalLevel?.PHD}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>PHD</span>{" "}
                        <span>{data?.byEducationalLevel?.PHD}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* Specialty */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byEducationalLevel?.SpecialtyData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byEducationalLevel?.SpecialtyData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>Specialty</span>{" "}
                          <span>{data?.byEducationalLevel?.Specialty}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>Specialty</span>{" "}
                        <span>{data?.byEducationalLevel?.Specialty}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* Subspecialty */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byEducationalLevel?.SubspecialtyData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byEducationalLevel?.SubspecialtyData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>Subspecialty</span>{" "}
                          <span>{data?.byEducationalLevel?.Subspecialty}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>Subspecialty</span>{" "}
                        <span>{data?.byEducationalLevel?.Subspecialty}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* SuperSpecialty */}
                <div>
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byEducationalLevel?.SuperSpecialtyData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byEducationalLevel?.SuperSpecialtyData?.map(
                              (val) => (
                                <li>
                                  🩺 {val.firstName} {val.middleName}{" "}
                                  {val.lastName}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      >
                        <p className="flex justify-between">
                          <span>SuperSpecialty</span>{" "}
                          <span>
                            {data?.byEducationalLevel?.SuperSpecialty}
                          </span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between">
                        <span>SuperSpecialty</span>{" "}
                        <span>{data?.byEducationalLevel?.SuperSpecialty}</span>
                      </p>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* gender */}
          <div className="rounded-lg shadow-2xl p-5 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl mb-3">
              By Gender
            </h3>
            <div className="flex justify-between gap-5">
              <div>
                <div className="">
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byGender?.maleData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byGender?.maleData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between gap-5">
                          <span>Male Staffs</span>{" "}
                          <span> {data?.byGender?.male}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between gap-5">
                        <span>Male Staffs</span>{" "}
                        <span> {data?.byGender?.male}</span>
                      </p>
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byGender?.femaleData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byGender?.femaleData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between gap-5">
                          <span>Female Staffs</span>{" "}
                          <span> {data?.byGender?.female}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between gap-5">
                        <span>Female Staffs</span>{" "}
                        <span> {data?.byGender?.female}</span>
                      </p>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Citizenship */}
          <div className="rounded-lg shadow-2xl p-5 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl mb-3">
              By Citizenship
            </h3>
            <div className="flex flex-col gap-5">
              <div>
                {/* ethiopian */}
                <div className="">
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byCitizenship?.ethiopianData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byCitizenship?.ethiopianData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex justify-between gap-5">
                          <span>Ethiopian</span>{" "}
                          <span> {data?.byCitizenship?.ethiopian}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between gap-5">
                        <span>Ethiopian</span>{" "}
                        <span> {data?.byCitizenship?.ethiopian}</span>
                      </p>
                    )}
                  </p>
                </div>
                {/* abroad */}
                <div className="">
                  <p className="px-1 hover:bg-blue-100 rounded-md">
                    {data?.byCitizenship?.AbroadData?.length ? (
                      <HtmlTooltip
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        title={
                          <ul>
                            {data?.byCitizenship?.AbroadData?.map((val) => (
                              <li>
                                🩺 {val.firstName} {val.middleName}{" "}
                                {val.lastName}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <p className="flex  justify-between gap-5">
                          <span>Foreigner</span>{" "}
                          <span> {data?.byCitizenship?.Abroad}</span>
                        </p>
                      </HtmlTooltip>
                    ) : (
                      <p className="flex justify-between gap-5">
                        <span>Foreigner </span>{" "}
                        <span> {data?.byCitizenship?.Abroad}</span>
                      </p>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default DataCard;
