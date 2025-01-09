import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import { NavLink } from "react-router-dom";

// type declaration here

type TRoute = {
  path?: string;
  index?: boolean;
  element: ReactNode;
};

type TSidebarRoute = {
  key: string;
  label: ReactNode;
  children?: TSidebarRoute[];
};

// main routes here
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

// react router routing logic
const adminPaths: TRoute[] = itemRoutes.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
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

// sidebar route logic here
export const adminSideRoutes: TSidebarRoute[] = itemRoutes.reduce(
  (acc: TSidebarRoute[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={item.path}>{item.name}</NavLink>,
      });
    } else if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={child.path}>{child.name}</NavLink>,
        })),
      });
    }
    return acc;
  },
  []
);

export default adminPaths;
