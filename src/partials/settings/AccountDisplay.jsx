import React, { useState, useEffect } from "react";
import Image from "../../images/user-avatar-80.png";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { axiosInstance } from "../../api/axios";
import PulseLoader from "../../components/PulseLoader/PulseLoader";
import useFetch from "../../customHooks/useFetch";

function AccountPanel() {
  const [sync, setSync] = useState(false);
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const { fetchSingleData, result, isLoading } = useFetch();
  console.log(userId);
  console.log(result);
  useEffect(() => {
    fetchSingleData(`/users`, userId);
  }, []);

  return isLoading ? (
    <PulseLoader />
  ) : (
    <>
      <div className="grow">
        <Link
          to={"/dashboard/users"}
          className="btn border-slate-200 flex gap-3 hover:border-slate-300 text-slate-600"
        >
          <BiArrowBack /> <button>Back </button>
        </Link>
        <div className="p-6 space-y-6">
          <section>
            <div className="flex items-center justify-center flex-col gap-2">
              <div className="">
                <img
                  className="h-40 w-40 rounded-full object-cover"
                  src={result?.avator}
                  width="100"
                  height="100"
                  alt="User upload"
                />
              </div>
              <section>
                <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
                  {result?.firstName} {result?.middleName} {result?.lastName}
                </h2>
                <div className="text-sm">
                  {result?.role} of The Medical Faculity
                </div>
              </section>
              {/* <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                Change
              </button> */}
            </div>
          </section>

          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Email
            </h2>
            <div className="text-sm">{result?.email} </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Gender
            </h2>
            <div className="text-sm">{result?.gender}</div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Department
            </h2>
            <div className="text-sm">{result?.Department?.name}</div>
          </section>

          <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Phone Number
            </h2>
            <div className="text-sm">{result?.phoneNumber}</div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AccountPanel;
