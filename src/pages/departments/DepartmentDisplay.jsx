import React, { useState, useEffect } from "react";
import Image from "../../images/user-avatar-80.png";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { axiosInstance } from "../../api/axios";
import PulseLoader from "../../components/PulseLoader/PulseLoader";
import useFetch from "../../customHooks/useFetch";

function DepartmentDisplay() {
  const [sync, setSync] = useState(false);
  const [user, setUser] = useState({});
  const { departmentId } = useParams();

  const { fetchSingleData, result, isLoading } = useFetch();

  // console.log(result);

  useEffect(() => {
    fetchSingleData(`/departments`, departmentId);
  }, []);

  return isLoading ? (
    <PulseLoader />
  ) : (
    <>
      <div className="grow h-[80vh]">
        <Link
          to={"/dashboard/departments"}
          className="btn border-slate-200 flex gap-3 hover:border-slate-300 text-slate-600"
        >
          <BiArrowBack /> <button>Back </button>
        </Link>
        <div className="p-6 gap-40 mt-10 mb-40 justify-center items-center flex flex-col md:flex-row    ">
          <section>
            <Link
              to={`/dashboard/departments/${departmentId}/programs`}
              className="text-xl border rounded-lg text-gray-500 border-1 border-blue-500  py-10 px-20"
            >
              Programs
            </Link>
          </section>
          <section>
            <Link
              to={`/dashboard/departments/${departmentId}/staffs`}
              className="text-xl border rounded-lg text-gray-500 border-1 border-blue-500  py-10 px-20"
            >
              Staffs
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

export default DepartmentDisplay;
