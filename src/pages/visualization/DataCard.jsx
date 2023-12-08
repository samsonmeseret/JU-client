import React, { useState } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Zoom from "@mui/material/Zoom";

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
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "#f5f5f9", // Set the arrow color to match the background color
    },
  }));

  const [isHovered, setIsHovered] = useState(false);
  const [staffs, setStaffs] = useState([]);
  return (
    <div>
      <a
        href="#"
        className="shadow-2xl bg-white relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 m-3"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4 relative">
          {/* on Education */}
          {isHovered && (
            <ul
              className="absolute top-0 left-[50%] max-h-[1000px] bg-blue-100 text-gray-700 rounded-md text-sm overflow-y-scroll translate-x-[-50%] p-5 w-96 "
              // onMouseEnter={() => setIsHovered(true)}
              // onMouseLeave={() => setIsHovered(false)}
            >
              {staffs?.length == 0 ? (
                <li>No staffs</li>
              ) : (
                staffs?.map((item) => {
                  return (
                    <li key={item.firstName}>
                      🩺 {item.firstName} {item.middleName} {item.lastName}
                    </li>
                  );
                })
              )}
            </ul>
          )}
          <div className=" rounded-lg shadow-2xl p-5 flex flex-col">
            <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
              On Education
            </h3>
            <div className="flex gap-5 justify-between">
              <div>
                <p className="flex gap-3">
                  <span>Domestic </span>
                </p>
                <p>Abroad</p>
                <p>Total</p>
              </div>
              <div>
                <p className="flex gap-3">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.domesticOnEducationData?.map((val) => (
                          <li>
                            {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.domesticOnEducation}
                  </HtmlTooltip>
                </p>
                <p>
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.abroadOnEducationData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {console.log(data?.abroadOnEducationData)}
                    {data?.abroadOnEducation}
                  </HtmlTooltip>
                </p>
                <p>
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.totalOnEducationData?.map((val) => (
                          <li>
                            {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.totalOnEducation}
                  </HtmlTooltip>
                </p>
              </div>
            </div>
          </div>
          {/* Academic Rank */}
          <div className="rounded-lg shadow-2xl p-5 flex flex-col">
            <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
              By Academic Rank
            </h3>
            <div className="flex gap-5 justify-between">
              <div>
                <p className="flex gap-3">
                  <span>Graduate Assistant I </span>
                </p>
                <p>Graduate Assistant II</p>
                <p>Assistant Lecture</p>
                <p>Lecture</p>
                <p>Technical Assistance I</p>
                <p>Technical Assistance II</p>
                <p>Technical Assistance III</p>
                <p>Senior Technical Assistant I</p>
                <p>Senior Technical Assistant II</p>
                <p>Senior Technical Assistant III</p>
                <p>Chief Technical Assistant I</p>
                <p>Chief Technical Assistant II</p>
                <p>Chief Technical Assistant III</p>
                <p>Assistant Professor</p>
                <p>Associate Professor</p>
                <p>Professor</p>
              </div>
              <div>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  {" "}
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.graduateAssistantIData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byRank?.graduateAssistantI}
                  </HtmlTooltip>
                </p>

                <p className="px-1 hover:bg-blue-100 rounded-md">
                  {" "}
                  {data?.byRank?.graduateAssistantII}
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.assistantLectureData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byRank?.assistantLecture}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.lecturerData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byRank?.lecturerI}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.technicalAssistanceIData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byRank?.technicalAssistanceI}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.technicalAssistanceIIData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byRank?.technicalAssistanceII}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.technicalAssistanceIIIData?.map(
                          (val) => (
                            <li>
                              🩺 {val.firstName} {val.middleName} {val.lastName}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  >
                    {data?.byRank?.technicalAssistanceIII}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.seniorTechnicalAssistantIData?.map(
                          (val) => (
                            <li>
                              🩺 {val.firstName} {val.middleName} {val.lastName}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  >
                    {data?.byRank?.seniorTechnicalAssistantI}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  {" "}
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.seniorTechnicalAssistantIIData?.map(
                          (val) => (
                            <li>
                              🩺 {val.firstName} {val.middleName} {val.lastName}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  >
                    {data?.byRank?.seniorTechnicalAssistantII}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.seniorTechnicalAssistantIIIData?.map(
                          (val) => (
                            <li>
                              🩺 {val.firstName} {val.middleName} {val.lastName}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  >
                    {data?.byRank?.seniorTechnicalAssistantIII}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.chiefTechnicalAssistantIData?.map(
                          (val) => (
                            <li>
                              🩺 {val.firstName} {val.middleName} {val.lastName}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  >
                    {data?.byRank?.chiefTechnicalAssistantI}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.chiefTechnicalAssistantIIData?.map(
                          (val) => (
                            <li>
                              🩺 {val.firstName} {val.middleName} {val.lastName}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  >
                    {data?.byRank?.chiefTechnicalAssistantII}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.chiefTechnicalAssistantIIIData?.map(
                          (val) => (
                            <li>
                              🩺 {val.firstName} {val.middleName} {val.lastName}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  >
                    {data?.byRank?.chiefTechnicalAssistantIII}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.assistanceProfessorData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byRank?.assistanceProfessor}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.associateProfessorData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byRank?.associateProfessor}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byRank?.professorData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byRank?.professor}
                  </HtmlTooltip>
                </p>
              </div>
            </div>
          </div>
          {/* Educational Level */}
          <div className="rounded-lg shadow-2xl p-5 flex flex-col">
            <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
              By Educational Level
            </h3>
            <div className="flex gap-5 justify-between">
              <div>
                <p className="flex gap-3">
                  <span>BSC</span>
                </p>
                <p>MD</p>
                <p>DMD</p>
                <p>MSC</p>
                <p>PHD</p>
                <p>Specialty</p>
                <p>Subspecialty</p>
                <p>Super Specialty</p>
              </div>
              <div>
                <p className="flex gap-3">
                  <span className="px-1 hover:bg-blue-100 rounded-md">
                    <HtmlTooltip
                      placement="right"
                      arrow
                      TransitionComponent={Zoom}
                      title={
                        <ul>
                          {data?.byEducationalLevel?.BSCData?.map((val) => (
                            <li>
                              🩺 {val.firstName} {val.middleName} {val.lastName}
                            </li>
                          ))}
                        </ul>
                      }
                    >
                      {data?.byEducationalLevel?.BSC}
                    </HtmlTooltip>
                  </span>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byEducationalLevel?.MDData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byEducationalLevel?.MD}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byEducationalLevel?.DMDData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byEducationalLevel?.DMD}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byEducationalLevel?.MSCData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byEducationalLevel?.MSC}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byEducationalLevel?.PHDData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byEducationalLevel?.PHD}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byEducationalLevel?.SpecialtyData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byEducationalLevel?.Specialty}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byEducationalLevel?.SubspecialtyData?.map(
                          (val) => (
                            <li>
                              🩺 {val.firstName} {val.middleName} {val.lastName}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  >
                    {data?.byEducationalLevel?.Subspecialty}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byEducationalLevel?.SuperSpecialtyData?.map(
                          (val) => (
                            <li>
                              🩺 {val.firstName} {val.middleName} {val.lastName}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  >
                    {data?.byEducationalLevel?.SuperSpecialty}
                  </HtmlTooltip>
                </p>
              </div>
            </div>
          </div>
          {/* gender */}
          <div className="rounded-lg shadow-2xl p-5 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl mb-3">
              By Gender
            </h3>
            <div className="flex gap-5">
              <div>
                <p className="flex gap-3">
                  <span>Male Staffs </span>
                </p>
                <p>Female Staffs</p>
                <p>Total Staff</p>
              </div>
              <div>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byGender?.maleData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byGender?.male}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byGender?.femaleData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byGender?.female}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  {" "}
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.result?.lengthData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.result?.length}
                  </HtmlTooltip>
                </p>
              </div>
            </div>
          </div>
          {/* Citizenship */}
          <div className="rounded-lg shadow-2xl p-5 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl mb-3">
              By Citizenship
            </h3>
            <div className="flex gap-5">
              <div>
                <p className="flex gap-3">
                  <span>Ethiopians </span>
                </p>
                <p>Foreigners</p>
              </div>
              <div>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  {" "}
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byCitizenship?.ethiopianData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byCitizenship?.ethiopian}
                  </HtmlTooltip>
                </p>
                <p className="px-1 hover:bg-blue-100 rounded-md">
                  {" "}
                  <HtmlTooltip
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                    title={
                      <ul>
                        {data?.byCitizenship?.AbroadData?.map((val) => (
                          <li>
                            🩺 {val.firstName} {val.middleName} {val.lastName}
                          </li>
                        ))}
                      </ul>
                    }
                  >
                    {data?.byCitizenship?.Abroad}
                  </HtmlTooltip>
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default DataCard;
