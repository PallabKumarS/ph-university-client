import FacultyDashboard from "../pages/faculty/FacultyDashboard";

const facultyPaths = [
  {
    index: true,
    element: <FacultyDashboard />,
  },
  {
    path: "dashboard",
    element: <FacultyDashboard />,
  },
];

export default facultyPaths;
