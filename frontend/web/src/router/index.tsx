import { AUTH_PREFIX, TITLE } from "@/assets/js/global";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import * as Icons from "@ant-design/icons";
import React from "react";
// 参考 https://juejin.cn/post/7132393527501127687

/** 导入指定文件下的路由模块 */
const modules = import.meta.glob("@/views/**/*.tsx");

/** 异步懒加载组件 */
export const lazyLoad = (moduleName: string) => {
  const Module = lazy(modules[`/src/views${moduleName}/index.tsx`] as any);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Module />
    </Suspense>
  );
};

/** 动态创建Icon */
const dynamicIcon = (icon: string) => {
  const antIcon: { [key: string]: any } = Icons; // 防止类型报错
  const DynamicIcon = React.createElement(antIcon[icon]);
  return DynamicIcon;
};

/** 判断是否登录 */
const IsAuth = ({ children }: any) => {
  // document.title = `${children} | ${TITLE}`; // 页面名
  const token = localStorage.getItem(AUTH_PREFIX);
  console.log("token", token);
  return token ? children : <Navigate to={"/login"} />;
};

/** 路由元信息 */
interface Meta {
  meta?: {
    title?: string;
    icon?: string;
  };
  children?: Meta[];
}

/** 路由对象 */
type MyRouteObject = RouteObject & Meta;

export const routers: MyRouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace={true} />,
  },
  {
    path: "/login",
    meta: { title: "登录" },
    element: lazyLoad("/login"),
  },
  {
    path: "/",
    meta: { title: "首页" },
    element: <IsAuth>{lazyLoad("/home")}</IsAuth>,
  },
  {
    path: "*",
    meta: { title: "404" },
    element: lazyLoad("/error"),
  },
];

/** 生成菜单 */
export const generateMenu = (data: any, isChild: boolean = false) => {
  const result: any = [];
  data.forEach((item: any, index: number) => {
    const obj: ItemType = {
      key: item.menu_url,
      label: item.name,
      icon: dynamicIcon(item.icon),
    };

    // isChild ? (obj.type = "group") : (obj.icon = <item.icon />);

    result.push(obj);

    if (item.children.length > 0) result[index].children = generateMenu(item.children, true);
  });

  return result;
};

/** 迭代动态路由 */
const iterateRouter = (data: any) => {
  const result: MyRouteObject[] = [];

  // 动态路由
  data.forEach((item: any, index: number) => {
    result.push({
      path: item.menu_url,
      meta: { title: item.name, icon: item.icon },
      element: lazyLoad("/home" + item.menu_url),
    });

    if (item.children.length > 0) result[index].children = iterateRouter(item.children);
  });

  return result;
};

/** 生成路由  */
export const generateRouter = (data: any) => {
  // 1. 迭代动态路由
  const dynamicRouters = iterateRouter(data);

  // 2. 合并所有路由 = 动态路由 + 静态路由
  const idx = routers.findIndex((item: any) => item.meta?.title == "首页");
  routers[idx].children = [...dynamicRouters];

  return routers.slice(); // 深拷贝, 防止地址引用
};
