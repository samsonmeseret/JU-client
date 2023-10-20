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
    const { officeId } = useParams();

    const { fetchSingleData, result, isLoading } = useFetch();


    useEffect(() => {
        fetchSingleData(`/offices`, officeId);
    }, []);

    return isLoading ? (
        <PulseLoader />
    ) : (
        <>
            <div className="grow">
                <Link
                    to={"/dashboard/offices"}
                    className="btn border-slate-200 flex gap-3 hover:border-slate-300 text-slate-600"
                >
                    <BiArrowBack /> <button>Back </button>
                </Link>
                <div className="p-6 space-y-6 flex justify-around gap-9">
                    <section>
                        <h1 className="mb-5 font-bold">
                            🔖 Office Informations
                        </h1>
                        <h2 className="text-xl leading-snug text-slate-800  mb-1">
                            Name: <span className="underline">{result?.name}</span>
                        </h2>
                        <h2 className="text-xl leading-snug text-slate-800  mb-1">
                            Coordinator: <span className="underline">{result?.coordinator}</span>
                        </h2>
                    </section>
                    <section className="flex flex-col gap-6">
                        <h2 className="font-bold">
                            Major Activities
                        </h2>
                        {result?.majorActivity?.split(",")?.map((spec) => {
                            return (
                                <section key={spec}>
                                    <h2 className="text-lg leading-snug text-slate-800  mb-1">
                                        ✅  {spec}
                                    </h2>

                                </section>
                            );
                        })}
                    </section>

         
                </div>
            </div>
        </>
    );
}

export default DepartmentDisplay;
