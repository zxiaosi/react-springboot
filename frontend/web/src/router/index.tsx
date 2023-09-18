import { LAYOUT_PAGE, LOGIN_ROUTE } from "@/assets/js/global";
import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import * as Icons from "@ant-design/icons";
import React from "react";
import IsAuth from "./isAuth";
import DomTitle from "./domTitle";
// 参考 https://juejin.cn/post/7132393527501127687

/** 导入指定文件下的路由模块 */
const modules = import.meta.glob("@/views/**/*.tsx");

/** 异步懒加载组件 */
const lazyLoad = (moduleName: string) => {
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
  return React.createElement(antIcon[icon]);
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
    path: LOGIN_ROUTE,
    meta: { title: "登录" },
    element: lazyLoad(LOGIN_ROUTE),
  },
  {
    path: "/",
    id: LAYOUT_PAGE,
    element: <IsAuth>{lazyLoad("/" + LAYOUT_PAGE)}</IsAuth>,
  },
  {
    path: "*",
    meta: { title: "404" },
    element: lazyLoad("/error"),
  },
];

/** 生成菜单 */
export const generateMenu = (data: any) => {
  const result: any = [];

  data.forEach((item: any, index: number) => {
    result.push({
      key: item.menuUrl,
      label: item.name,
      icon: dynamicIcon(item.icon),
    });

    if (item.children.length > 0) result[index].children = generateMenu(item.children);
  });

  return result;
};

/** 迭代动态路由 */
const iterateRouter = (data: any) => {
  const result: MyRouteObject[] = [];

  // 动态路由
  data?.forEach((item: any, index: number) => {

    result.push({
      path: item.menuUrl,
      meta: { title: item.name, icon: item.icon },
      element: <DomTitle title={item.name}>{lazyLoad("/" + LAYOUT_PAGE + item.menuUrl)}</DomTitle>,
    });

    if (item.children?.length > 0) result[index].children = iterateRouter(item.children);
  });


  return result;
};

/** 生成路由  */
export const generateRouter = (data: any) => {
  // 1. 迭代动态路由
  const dynamicRouters = data ? iterateRouter(data) : [];

  // 2. 合并所有路由 = 动态路由 + 静态路由
  const idx = routers.findIndex((item: any) => item.id == LAYOUT_PAGE);
  routers[idx].children = [...dynamicRouters];

  // 3. 静态路由添加标题 document.title - 可不要
  routers.map((item) => {
    item.element = <DomTitle title={item.meta?.title}>{item.element as any}</DomTitle>;
    return item;
  });

  return routers.slice(); // 注意这里要浅拷贝返回一个新的数组，否则会报错
};
