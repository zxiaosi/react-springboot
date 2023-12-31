import { generateRouter, routers } from "@/router";
import { useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { getLocal, setLocal } from "./request/auth";
import { useMenuApi } from "./apis";
import { LoginUrl, MenuStore } from "./assets/js/global";

import "./App.css";

function App() {
  const location = useLocation();

  const [route, setRoute] = useState(routers); // 所有路由

  const element = useRoutes(route); // set的时候会重新渲染

  const menuStorage = getLocal(MenuStore) || []; // 这里给一个默认值，防止序列化报错

  const { repsonse } = useMenuApi({ isReq: menuStorage?.length == 0 && location.pathname != LoginUrl });

  useEffect(() => {
    const newRoute = generateRouter(menuStorage || repsonse?.data);
    setRoute(newRoute);
    repsonse?.data?.length > 0 && setLocal(MenuStore, repsonse?.data);
  }, [repsonse]);

  // <></> 组件 -- https://react.dev/reference/react/Fragment
  return <>{element}</>;
}

export default App;
