import React, { useState } from "react";

const DataCard = ({ data }) => {
  console.log(data);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <a
        href="#"
        className="shadow-2xl bg-white relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 m-3"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          {/* on Education */}
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
                  {/* <div className="hidden hover:block">
                    {data.domesticOnEducationData.map((item) => {
                      return <p>{item}</p>;
                    })}
                  </div> */}
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
                <p className="flex gap-3">
                  <span> {data?.byRank?.graduateAssistantI}</span>
                </p>

                <p> {data?.byRank?.graduateAssistantII}</p>
                <p> {data?.byRank?.assistantLecture}</p>
                <p> {data?.byRank?.lecturer}</p>
                <p> {data?.byRank?.technicalAssistanceI}</p>
                <p> {data?.byRank?.technicalAssistanceII}</p>
                <p> {data?.byRank?.technicalAssistanceIII}</p>
                <p> {data?.byRank?.seniorTechnicalAssistantI}</p>
                <p> {data?.byRank?.seniorTechnicalAssistantII}</p>
                <p> {data?.byRank?.seniorTechnicalAssistantIII}</p>
                <p> {data?.byRank?.chiefTechnicalAssistantI}</p>
                <p> {data?.byRank?.chiefTechnicalAssistantII}</p>
                <p> {data?.byRank?.chiefTechnicalAssistantIII}</p>
                <p> {data?.byRank?.assistanceProfessor}</p>
                <p> {data?.byRank?.associateProfessor}</p>
                <p
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {" "}
                  {data?.byRank?.professor}{" "}
                </p>
                {isHovered && (
                  <ul className="absolute bottom-0 bg-white p-5">
                    {data?.byRank?.professorData?.map((item) => {
                      return (
                        <li key={item.firstName}>
                          {item.firstName} {item.lastName}
                        </li>
                      );
                    })}
                  </ul>
                )}
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
                  <span> {data?.byEducationalLevel?.BSC}</span>
                </p>
                <p> {data?.byEducationalLevel?.MD}</p>
                <p> {data?.byEducationalLevel?.DMD}</p>
                <p> {data?.byEducationalLevel?.MSC}</p>
                <p> {data?.byEducationalLevel?.PHD}</p>
                <p> {data?.byEducationalLevel?.Specialty} </p>
                <p> {data?.byEducationalLevel?.Subspecialty}</p>
                <p> {data?.byEducationalLevel?.SuperSpecialty}</p>
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
                <p className="flex gap-3">
                  <span> {data?.byGender?.male}</span>
                </p>
                <p>
                  <span> {data?.byGender?.female}</span>
                </p>
                <p>
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
                <p className="flex gap-3">
                  <span> {data?.byCitizenship?.ethiopian}</span>
                </p>
                <p>
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
