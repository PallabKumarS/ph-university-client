import AcademicDepartment from "../pages/admin/academicManagement/academicDepartment/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/academicFaculty/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/academicSemester/AcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminData from "../pages/admin/userManagement/AdminData";
import StudentData from "../pages/admin/userManagement/StudentData";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import TeacherData from "../pages/admin/userManagement/TeacherData";
import { TUserPaths } from "../types/sidebar.type";

// main routes here
export const adminPaths: TUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },

  // user management
  {
    name: "User Management",
    children: [
      {
        name: "Student Management",
        path: "students",
        element: <StudentData />,
      },
      {
        name: "Student Details",
        path: "students/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Teacher Management",
        path: "teachers",
        element: <TeacherData />,
      },
      {
        name: "Admin Management",
        path: "admins",
        element: <AdminData />,
      },
    ],
  },

  // academic management
  {
    name: "Academic Management",
    children: [
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
];

export default adminPaths;
