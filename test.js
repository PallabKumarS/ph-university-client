// export const itemRoutes = [
//   {
//     name: "Dashboard",
//     path: "/admin/dashboard",
//     element: "AdminDashboard",
//   },
//   {
//     name: "User Management",
//     children: [
//       {
//         name: "Create Student",
//         path: "/admin/create-student",
//         element: "CreateStudent",
//       },
//       {
//         name: "Create Teacher",
//         path: "/admin/create-teacher",
//         element: "CreateTeacher",
//       },
//       {
//         name: "Create Admin",
//         path: "/admin/create-admin",
//         element: "CreateAdmin",
//       },
//     ],
//   },
// ];

// const newArray = itemRoutes.reduce((acc, item) => {
//   if (item.name && item.element) {
//     if (item.name.toLowerCase() === item.path.split("/").pop()) {
//       acc.push({
//         index: true,
//         element: item.element,
//       });
//     }
//     acc.push({
//       path: item.path.split("/").pop(),
//       element: item.element,
//     });
//   }
//   if (item.children) {
//     item.children.forEach((child) => {
//       if (child.name.toLowerCase() === child.path.split("/").pop()) {
//         acc.push({
//           index: true,
//           element: item.element,
//         });
//       }
//       acc.push({
//         path: child.path.split("/").pop(),
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);

// const newArray = itemRoutes.reduce((acc, item) => {
//   if (item.name && item.path) {
//     acc.push({
//       key: item.name,
//       label: `<NavLink to="${item.path}">${item.name}</NavLink>`,
//     });
//   } else if (item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: `<NavLink to="${child.path}">${child.name}</NavLink>`,
//       })),
//     });
//   }
//   return acc;
// }, []);

console.log(newArray);
console.log("create-student" === "createstudent");
