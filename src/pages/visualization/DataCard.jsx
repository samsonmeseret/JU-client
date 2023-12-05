import React, { useState } from "react";

const DataCard = ({ data }) => {
  console.log(data);
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
                  <span> {data?.domesticOnEducation}</span>
                </p>
                <p> {data?.abroadOnEducation}</p>
                <p> {data?.totalOnEducation}</p>
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
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.graduateAssistantIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  <span> {data?.byRank?.graduateAssistantI}</span>
                </p>

                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.graduateAssistantIIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.graduateAssistantII}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.assistantLectureData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.assistantLecture}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.lecturerData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.lecturer}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.technicalAssistanceIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.technicalAssistanceI}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.technicalAssistanceIIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.technicalAssistanceII}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.technicalAssistanceIIIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.technicalAssistanceIII}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.seniorTechnicalAssistantIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.seniorTechnicalAssistantI}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.seniorTechnicalAssistantIIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.seniorTechnicalAssistantII}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.seniorTechnicalAssistantIIIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.seniorTechnicalAssistantIII}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.chiefTechnicalAssistantIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.chiefTechnicalAssistantI}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.chiefTechnicalAssistantIIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.chiefTechnicalAssistantII}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.chiefTechnicalAssistantIIIData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.chiefTechnicalAssistantIII}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.assistanceProfessorData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.assistanceProfessor}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byRank?.associateProfessorData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byRank?.associateProfessor}
                </p>
                <p
                  onClick={() => {
                    setStaffs(data?.byRank?.professorData);
                    setIsHovered(!isHovered);
                  }}
                  // onMouseLeave={() => setIsHovered(false)}
                  className="px-1 hover:bg-blue-100 rounded-md"
                >
                  {" "}
                  {data?.byRank?.professor}{" "}
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
                  <span
                    className="px-1 hover:bg-blue-100 rounded-md"
                    onClick={() => {
                      setStaffs(data?.byEducationalLevel?.BSCData);
                      setIsHovered(!isHovered);
                    }}
                  >
                    {" "}
                    {data?.byEducationalLevel?.BSC}
                  </span>
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byEducationalLevel?.MDData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byEducationalLevel?.MD}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byEducationalLevel?.DMDData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byEducationalLevel?.DMD}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byEducationalLevel?.MSCData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byEducationalLevel?.MSC}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byEducationalLevel?.PHDData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byEducationalLevel?.PHD}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byEducationalLevel?.SpecialtyData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byEducationalLevel?.Specialty}{" "}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byEducationalLevel?.SubspecialtyData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byEducationalLevel?.Subspecialty}
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byEducationalLevel?.SuperSpecialtyData);
                    setIsHovered(!isHovered);
                  }}
                >
                  {" "}
                  {data?.byEducationalLevel?.SuperSpecialty}
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
                <p
                  onClick={() => {
                    setStaffs(data?.byGender?.maleData);
                    setIsHovered(!isHovered);
                  }}
                  className="px-1 hover:bg-blue-100 rounded-md"
                >
                  <span> {data?.byGender?.male}</span>
                </p>
                <p
                  onClick={() => {
                    setStaffs(data?.byGender?.femaleData);
                    setIsHovered(!isHovered);
                  }}
                  className="px-1 hover:bg-blue-100 rounded-md"
                >
                  <span> {data?.byGender?.female}</span>
                </p>
                <p
                  className="px-1 hover:bg-blue-100 rounded-md"
                  onClick={() => {
                    setStaffs(data?.byGender?.femaleData);
                    setIsHovered(!isHovered);
                  }}
                >
                  <span> {data?.result?.length}</span>
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
                <p
                  onClick={() => {
                    setStaffs(data?.byCitizenship?.ethiopianData);
                    setIsHovered(!isHovered);
                  }}
                  className="px-1 hover:bg-blue-100 rounded-md"
                >
                  <span> {data?.byCitizenship?.ethiopian}</span>
                </p>
                <p
                  onClick={() => {
                    setStaffs(data?.byCitizenship?.AbroadData);
                    setIsHovered(!isHovered);
                  }}
                  className="px-1 hover:bg-blue-100 rounded-md"
                >
                  <span> {data?.byCitizenship?.Abroad}</span>
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
