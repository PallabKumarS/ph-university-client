import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";

export const itemRoutes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create Faculty",
        path: "/admin/create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
];

const adminPaths = itemRoutes.reduce<
  Array<{ path?: string; index?: boolean; element: JSX.Element }>
>((acc, item) => {
  if (item.name && item.element) {
    if (item.name.toLowerCase() === item.path.split("/").pop()) {
      acc.push({
        index: true,
        element: item.element,
      });
    }
    acc.push({
      path: item.path.split("/").pop(),
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((child) => {
      if (child.name.toLowerCase() === child.path.split("/").pop()) {
        acc.push({
          index: true,
          element: child.element,
        });
      }
      acc.push({
        path: child.path.split("/").pop(),
        element: child.element,
      });
    });
  }
  return acc;
}, []);

export default adminPaths;
