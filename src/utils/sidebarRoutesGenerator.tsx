import { NavLink } from "react-router-dom";
import { TSidebarRoute, TUserPaths } from "../types";

export default function sidebarRoutesGenerator(
  items: TUserPaths[],
  role: string
) {
  const sidebarRoutes: TSidebarRoute[] = items.reduce(
    (acc: TSidebarRoute[], item: TUserPaths): TSidebarRoute[] => {
      if (item.name && item.path) {
        acc.push({
          key: item.name,
          label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        });
      } else if (item.children) {
        acc.push({
          key: item.name,
          label: item.name,
          children: item.children.map((child) => ({
            key: child.name,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
          })),
        });
      }
      return acc;
    },
    []
  );

  return sidebarRoutes;
}
