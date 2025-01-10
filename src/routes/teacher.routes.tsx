import TeacherDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";

const teacherPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <TeacherDashboard />,
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Courses",
        path: "courses",
        element: <MyCourses />,
      },
    ],
  },
];

export default teacherPaths;
