import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CompLoader from "../../components/CompLoader";
import {
  getDepartments,
  getInstructors,
  getLeaves,
} from "../../Redux/reducers/dataSlice";
import { axiosInstance } from "../../api/axios";
import { FcLeave } from "react-icons/fc";
import { FcTemplate } from "react-icons/fc";
import { MdCastForEducation } from "react-icons/md";
import { LiaUsersCogSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

function DashboardCard07() {
  const dispatch = useDispatch();

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    instructorList,
    leaveList,
    departmentList,
    isLoading: load,
  } = useSelector((state) => state.deptData);
  const { user } = useSelector((state) => state.auth);

  const fetchUser = async () => {
    setIsLoading(true);
    axiosInstance
      .get("/users")
      .then((data) => {
        setUserList(data?.data?.result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getInstructors());
    dispatch(getDepartments());
    dispatch(getLeaves());
    fetchUser();
  }, []);

  return (
    <>
      {isLoading || load ? (
        <div className="mt-8">
          <CompLoader color={"#6366F1"} />
        </div>
      ) : (
        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">System Overview</h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Source</div>
                    </th>
                    {/* <th className="p-2">
                                    <div className="font-semibold text-center"></div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center"></div>
                                </th> */}
                    <th className="p-2">
                      <div className="font-semibold text-center">Total</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Explore</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm font-medium divide-y divide-slate-100">
                  {/* Row */}
                  <tr>
                    <td className="p-2">
                      <div className="flex items-center">
                        <FcLeave
                          style={{
                            width: "30px",
                            height: "35px",
                            margin: "7px",
                          }}
                        />

                        <div className="text-slate-800">Leave Requests</div>
                      </div>
                    </td>
                    {/* <td className="p-2">
                                    <div className="text-center">2.4K</div>
                                </td>
                                <td className="p-2">
                                    <div className="text-center text-emerald-500">$3,877</div>
                                </td> */}
                    <td className="p-2">
                      <div className="text-center">
                        {
                          leaveList?.filter((item) => item.status == "pending")
                            .length
                        }
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500">
                        <Link to={"/dashboard/leaves"}>Open</Link>
                      </div>
                    </td>
                  </tr>
                  {/* Row */}
                  {/* <tr>
                    <td className="p-2">
                      <div className="flex items-center">
                        <FcTemplate
                          style={{
                            width: "30px",
                            height: "35px",
                            margin: "7px",
                          }}
                        />

                        <div className="text-slate-800">Staffs</div>
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="text-center">
                        {instructorList?.length}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500">
                        <Link to={"/dashboard/staffs"}>Open</Link>
                      </div>
                    </td>
                  </tr> */}
                  {/* Departments */}
                  {user?.role == "dean" && (
                    <tr>
                      <td className="p-2">
                        <div className="flex items-center">
                          <MdCastForEducation
                            style={{
                              width: "20px",
                              height: "25px",
                              margin: "7px",
                            }}
                          />

                          <div className="text-slate-800">Departments</div>
                        </div>
                      </td>
                      {/* <td className="p-2">
                                    <div className="text-center">2.0K</div>
                                </td>
                                <td className="p-2">
                                    <div className="text-center text-emerald-500">$2,444</div>
                                </td> */}
                      <td className="p-2">
                        <div className="text-center">
                          {departmentList?.length}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-sky-500">
                          <Link to={"/dashboard/departments"}>Open</Link>
                        </div>
                      </td>
                    </tr>
                  )}
                  {/* Users */}
                  {user?.role == "dean" && (
                    <tr>
                      <td className="p-2">
                        <div className="flex items-center">
                          <LiaUsersCogSolid
                            style={{
                              width: "20px",
                              height: "25px",
                              margin: "7px",
                            }}
                          />

                          <div className="text-slate-800">System Users</div>
                        </div>
                      </td>
                      {/* <td className="p-2">
                                    <div className="text-center">1.9K</div>
                                </td>
                                <td className="p-2">
                                    <div className="text-center text-emerald-500">$2,236</div>
                                </td> */}
                      <td className="p-2">
                        <div className="text-center">{userList?.length}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-sky-500">
                          <Link to={"/dashboard/users"}>Open</Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardCard07;
