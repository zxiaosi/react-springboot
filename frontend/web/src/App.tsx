import { generateRouter, routers } from "@/router";
import { useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { getLocal, setLocal } from "./request/auth";
import { useMenuApi } from "./apis";
import { LOGIN_ROUTE, MENU_STORAGE } from "./assets/js/global";

import "./App.css";

function App() {

  const [route, setRoute] = useState(routers);
  const element = useRoutes(route); // set的时候会重新渲染

  const location = useLocation();
  const router = getLocal(MENU_STORAGE) || []; // 这里给一个默认值，防止序列化报错

  const { repsonse } = useMenuApi({ isReq: router?.length == 0 && location.pathname != LOGIN_ROUTE }, {});

  useEffect(() => {
    const newRoute = generateRouter(router || repsonse?.data);
    setRoute(newRoute);
    repsonse && setLocal(MENU_STORAGE, repsonse?.data);
  }, [repsonse]);

  // <></> 组件 -- https://react.dev/reference/react/Fragment
  return <>{element}</>;
}

export default App;
