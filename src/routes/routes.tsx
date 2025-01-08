import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import adminPaths from "./admin.routes";
import studentPaths from "./student.routes";
import facultyPaths from "./faculty.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <App />,
    children: adminPaths,
  },
  {
    path: "/faculty",
    element: <App />,
    children: facultyPaths,
  },
  {
    path: "/student",
    element: <App />,
    children: studentPaths,
  },
]);

export default router;
