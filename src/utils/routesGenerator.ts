import { ReactNode } from "react";

// type declaration here
type TRoute = {
  path?: string;
  index?: boolean;
  element: ReactNode;
};

type TUserPaths = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPaths[];
};

export const routesGenerator = (items: TUserPaths[]) => {
  const routes: TRoute[] = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      if (item.name.toLowerCase() === item.path) {
        acc.push({
          index: true,
          element: item.element,
        });
      }
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    if (item.children) {
      item.children.forEach((child) => {
        if (child.name.toLowerCase() === child.path!) {
          acc.push({
            index: true,
            element: child.element,
          });
        }
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);

  return routes;
};
