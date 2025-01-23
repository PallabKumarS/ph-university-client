import sidebarRoutesGenerator from "../../utils/sidebarRoutesGenerator";
import adminPaths from "../../routes/admin.routes";
import studentPaths from "../../routes/student.routes";
import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hook";
import { TUser, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { TSidebarRoute } from "../../types/sidebar.type";
import { USER_ROLE } from "../../constants/user";

const { Sider } = Layout;

const Sidebar = () => {
  let sidebarRoutes: TSidebarRoute[] | undefined;

  const user = useAppSelector(selectCurrentUser) as TUser | null;

  switch (user?.role || "student") {
    case USER_ROLE.admin:
      sidebarRoutes = sidebarRoutesGenerator(adminPaths, USER_ROLE.admin);
      break;
    case USER_ROLE.student:
      sidebarRoutes = sidebarRoutesGenerator(studentPaths, USER_ROLE.student);
      break;
    case USER_ROLE.teacher:
      sidebarRoutes = sidebarRoutesGenerator(studentPaths, USER_ROLE.teacher);
      break;
    default:
      sidebarRoutes = [];
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
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
