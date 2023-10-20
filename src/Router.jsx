import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "./pages/utility/PageNotFound";
import SignIn from "./pages/Signin";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Account from "./pages/settings/Account";
import UsersList from "./pages/Users/UsersList";
import ProtectedRoutes from "./ProtectRoute/ProtectRoute";
import LayOut from "./pages/LayOut/LayOut";
import PasswordChange from "./partials/settings/PasswordChange";
import ProfileDisplay from "./pages/settings/ProfileDisplaye";
import DepartmentList from "./pages/departments/Departments";
import DepartmentDisplay from "./pages/departments/DepartmentDisplay";
import SpecializationsList from "./pages/specializations/Specializations";
import SpecializationsDisplay from "./pages/specializations/SpecializationDisplay";
import StaffList from "./pages/staffs/StaffList";
import StaffDisplay from "./pages/staffs/StaffsDisplay";
import LeaveList from "./pages/leaves/LeaveList";
import OfficeList from "./pages/offices/OfficeList";
import OfficeDisplay from "./pages/offices/OfficeDisplay";
import AcademicUnit from "./pages/academicUnit/AcademicUnit";
import OnEducation from "./pages/onEducation/OnEducation";
import DataVisualizeLayout from "./pages/visualization/DataVisualizeLayout";
import Home from "./components/Hero/Hero";
import About from "./components/About/About";
import ContactUs from "./components/ContactUs/ContactUs";
import ProtectRole from "./ProtectRoute/ProtectRole";
import { Footer } from "antd/es/layout/layout";
import AnnualPlan from "./pages/AnnualPlan/AnnualPlan";
import Curriculum from "./pages/curriculum/Curriculum";
import StudentList from "./pages/student-list/StudentList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ResetPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <UpdatePassword />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <LayOut />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "",
        element: <DataVisualizeLayout />,
      },
      // Department Route
      {
        path: "departments",
        element: (
          // <ProtectRole>
          <DepartmentList />
          // </ProtectRole>
        ),
      },
      {
        path: "departments/:departmentId",
        element: (
          // <ProtectRole>
          <DepartmentDisplay />
          // </ProtectRole>
        ),
      },
      {
        path: "departments/:departmentId/programs",
        element: <SpecializationsList />,
      },
      {
        path: "departments/:departmentId/programs/:programId",
        element: <SpecializationsDisplay />,
      },
      {
        path: "departments/:departmentId/staffs",
        element: <StaffList />,
      },
      {
        path: "departments/:departmentId/staffs/:staffId",
        element: <StaffDisplay />,
      },

      {
        path: "leaves",
        element: <LeaveList />,
      },
      {
        path: "annual-plan",
        element: <AnnualPlan />,
      },
      {
        path: "curriculum",
        element: <Curriculum />,
      },
      {
        path: "student-list",
        element: <StudentList />,
      },

      // on Education
      {
        path: "on-education",
        element: <OnEducation />,
      },
      // Offices
      {
        path: "offices",
        element: (
          <ProtectRole>
            <OfficeList />
          </ProtectRole>
        ),
      },
      {
        path: "offices/:officeId",
        element: (
          <ProtectRole>
            <OfficeDisplay />
          </ProtectRole>
        ),
      },
      // Setting Route
      {
        path: "settings/account",
        element: <Account />,
      },
      {
        path: "settings/account/update-password",
        element: <PasswordChange />,
      },
      // Users Route
      {
        path: "users",
        element: (
          <ProtectRole>
            <UsersList />
          </ProtectRole>
        ),
      },
      {
        path: "users/:userId",
        element: (
          <ProtectRole>
            <ProfileDisplay />
          </ProtectRole>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
