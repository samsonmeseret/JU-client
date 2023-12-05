import React, { useEffect, useState } from "react";
import DoughnutChart from "../../charts/DoughnutChart";
// Import utilities
import { tailwindConfig } from "../../utils/Utils";
import { useSelector } from "react-redux";
import CompLoader from "../../components/CompLoader";
import { axiosInstance } from "../../api/axios";
import PolarChart from "../../charts/PolarChart";
import DataCard from "./DataCard";
import PieChart from "./BarChart";

function DashboardCard06({ data }) {
  const [isLoading, setIsLoading] = useState(false);

  const chartData = {
    labels: ["Abroad Education", "In Country Education"],
    datasets: [
      {
        label: "Staffs On Education",
        data: [`${data?.abroadOnEducation}`, `${data?.domesticOnEducation}`],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Overall Staff Status</h2>
        </header>
        <div>
          <div className="grid grid-col-1 md:grid-cols-2">
            <div className="p-3 flex flex-col justify-center items-center shadow-md ml-10 text-7xl">
              <h1 className="text-7xl font-bold text-blue-500">
                <span>{data?.total}</span>
              </h1>
              <div className="flex flex-col">
                <span className="text-5xl">Staffs</span>
                <small className="text-sm text-right">total</small>
              </div>
            </div>
            <div>
              {/* <PolarChart data={chartData} width={389} height={260} /> */}
            </div>
            {/* <PieChart /> */}
          </div>
          <div className="">
            <DataCard data={data} />
          </div>
        </div>
        {/* Chart built with Chart.js 3 */}
        {/* Change the height attribute to adjust the chart height */}
        {/* <DoughnutChart data={chartData} width={389} height={260} /> */}
      </div>
    </>
  );
}

export default DashboardCard06;
