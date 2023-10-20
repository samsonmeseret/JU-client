import React, { useState, useEffect } from "react";
import Image from "../../images/user-avatar-80.png";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { axiosInstance } from "../../api/axios";
import PulseLoader from "../../components/PulseLoader/PulseLoader";
import useFetch from "../../customHooks/useFetch";
import moment from "moment";

function AccountPanel() {
  const [sync, setSync] = useState(false);
  const [user, setUser] = useState({});
  const { staffId, departmentId } = useParams();
  // departments/:departmentId/staffs
  const { fetchSingleData, result, isLoading } = useFetch();

  useEffect(() => {
    fetchSingleData(`/instructors`, staffId);
  }, []);

  return isLoading ? (
    <PulseLoader />
  ) : (
    <>
      <div className="grow h-[85vh] ">
        <Link
          to={`/dashboard/departments/${departmentId}/staffs`}
          className="btn border-slate-200 flex gap-3 hover:border-slate-300 text-slate-600"
        >
          <BiArrowBack /> <button>Back </button>
        </Link>
        <div className=" grid md:grid-cols-3 p-6 space-y-6">
          <section>
            <p className=" mb-4 font-bold">Full Name</p>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              {result?.firstName} {result?.middleName} {result?.lastName}
            </h2>
            <div className="text-sm">Staff of The Medical Faculity</div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Email
            </h2>
            <div
              className={`${
                result?.email ? "text-sm" : "text-sm text-red-500"
              }`}
            >
              {result?.email ? result?.email : "no email address"}{" "}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Gender
            </h2>
            <div
              className={`${
                result?.gender ? "text-sm" : "text-sm text-red-500"
              }`}
            >
              {result?.gender ? result?.gender : "gender not added"}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Educational Level
            </h2>
            <div
              className={`${
                result?.qualification ? "text-sm" : "text-sm text-red-500"
              }`}
            >
              {result?.qualification
                ? result?.qualification
                : "qualification not present"}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Department
            </h2>
            <div
              className={`${
                result?.Department?.name ? "text-sm" : "text-sm text-red-500"
              }`}
            >
              {result?.Department?.name
                ? result?.Department?.name
                : "department not present"}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Citizenship
            </h2>
            <div
              className={`${
                result?.citizenship ? "text-sm" : "text-sm text-red-500"
              }`}
            >
              {result?.citizenship
                ? result?.citizenship
                : "no specialization found"}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Current Status
            </h2>
            <div
              className={`${
                result?.currentStatus ? "text-sm" : "text-sm text-red-500"
              }`}
            >
              {result.currentStatus
                ? result.currentStatus
                : "no sub specialization found"}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Academic Rank
            </h2>
            <div
              className={`${result?.rank ? "text-sm" : "text-sm text-red-500"}`}
            >
              {result?.rank ? result?.rank : "no rank found"}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Employment Type
            </h2>
            <div
              className={`${
                result?.employment ? "text-sm" : "text-sm text-red-500"
              }`}
            >
              {result?.employment ? result?.employment : "no employment found"}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Date of Birth
            </h2>
            <div
              className={`${
                result?.dateOfBirth ? "text-sm" : "text-sm text-red-500"
              }`}
            >
              {moment(result.dateOfBirth).format("DD/MM/YYYY")
                ? moment(result.dateOfBirth).format("DD/MM/YYYY")
                : "no birth date found"}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Year Staff Joined
            </h2>
            <div
              className={`${
                result?.joinedYear ? "text-sm" : "text-sm text-red-500"
              }`}
            >
              {moment(result.joinedYear).format("DD/MM/YYYY")
                ? moment(result.joinedYear).format("DD/MM/YYYY")
                : "no joined year found"}
            </div>
          </section>

          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Phone Number
            </h2>
            <div
              className={`${
                result?.phoneNumber ? "text-sm" : "text-sm text-red-500"
              }`}
            >
              {result.phoneNumber
                ? result?.phoneNumber
                : "no phone number found"}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AccountPanel;
