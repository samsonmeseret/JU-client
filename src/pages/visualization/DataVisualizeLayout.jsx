import React, { useEffect, useState } from "react";
import DataList from "./DataLists";
import StaffDonat from "./StaffDonatChart";
import LineChart01 from "../../charts/LineChart01";
import { BiLineChart } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { RotateLoader } from "react-spinners";
import { axiosInstance } from "../../api/axios";
import DataCard from "./DataCard";
import CompLoader from "../../components/CompLoader";

const DataVisualizeLayout = () => {
  const [isLoading, setIsLoading] = useState();
  const { isAuth, user } = useSelector((state) => state.auth);
  const [data, setData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/instructors")
      .then((data) => {
        // console.log(data.data);
        setData(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="text-2xl text-center pt-5 text-blue-600 font-semibold">
        Smart Employee and Academic activity Management System Dashboard
      </div>
      <div className="text-center text-lg p-5">
        Welcome back ! {"  "}
        <span className="font-semibold text-xl text-blue-500">
          {user?.firstName} {user?.lastName},
        </span>
      </div>
      {/* <section className='grid grid-cols-1 gap-5 md:grid-cols-2'> */}
      <div className="grid grid-cols-1">
        {isLoading ? (
          <CompLoader color={"#6366F1"} />
        ) : (
          <StaffDonat data={data} />
        )}
        {/* <BiLineChart /> */}
      </div>
      <div>
        <DataList />
      </div>
      {/* </section> */}
    </>
  );
};

export default DataVisualizeLayout;
