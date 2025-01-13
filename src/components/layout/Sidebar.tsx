import sidebarRoutesGenerator from "../../utils/sidebarRoutesGenerator";
import adminPaths from "../../routes/admin.routes";
import studentPaths from "../../routes/student.routes";
import { Layout, Menu } from "antd";
import { TSidebarRoute, TUser } from "../../types";
import { useAppSelector } from "../../redux/hook";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  STUDENT: "student",
  TEACHER: "teacher",
};

const Sidebar = () => {
  let sidebarRoutes: TSidebarRoute[] | undefined;

  const user = useAppSelector(useCurrentUser) as TUser | null;

  switch (user?.role || "student") {
    case userRole.ADMIN:
      sidebarRoutes = sidebarRoutesGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.STUDENT:
      sidebarRoutes = sidebarRoutesGenerator(studentPaths, userRole.STUDENT);
      break;
    case userRole.TEACHER:
      sidebarRoutes = sidebarRoutesGenerator(studentPaths, userRole.TEACHER);
      break;
    default:
      sidebarRoutes = [];
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      // onBreakpoint={(broken) => {

      // }}
      // onCollapse={(collapsed, type) => {

      // }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>PH University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[``]}
        items={sidebarRoutes}
      />
    </Sider>
  );
};
export default Sidebar;
