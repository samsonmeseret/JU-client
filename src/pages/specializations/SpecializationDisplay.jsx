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
  const { specializationId } = useParams();

  const { fetchSingleData, result, isLoading } = useFetch();

  useEffect(() => {
    fetchSingleData(`/specializations`, specializationId);
  }, []);

  return isLoading ? (
    <PulseLoader />
  ) : (
    <>
      <div className="grow">
        <Link
          to={"/dashboard/specializations"}
          className="btn border-slate-200 flex gap-3 hover:border-slate-300 text-slate-600"
        >
          <BiArrowBack /> <button>Back </button>
        </Link>
        <div className="p-6 space-y-6 flex justify-around gap-9">
          <section>
            <h1 className="mb-5 font-bold">
              🔖 Specialization along with it's Sub-Specializations
            </h1>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              {result?.name}
            </h2>
            <div className="text-sm">
              Specialization of The{" "}
              <span className="font-bold">{result?.Department?.name}</span>{" "}
              Department
            </div>
          </section>
          <section className="flex flex-col gap-6">
            <h2 className="font-bold">Sub Specializations</h2>

              <section>

                {result?.SubSpecializations?.map((sub, i) => {
                  return <div key={i} className="ml-5 text-lg">🧾 {sub?.name}</div>;
              })}
            </section>
          </section>
        </div>
      </div>
    </>
  );
}

export default DepartmentDisplay;
