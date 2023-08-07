import { generateRouter, routers } from "@/router";
import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import mockData from "@/apis/mock.json";
import { getLocal } from "./request/auth";

import "./App.css";

function App() {
  const [route, setRoute] = useState(routers);

  const element = useRoutes(route);

  useEffect(() => {
    const router = getLocal("router");
    const newRoute = generateRouter(router || mockData) as any;
    setRoute(newRoute);
  }, []);

  return <>{element}</>;
}

export default App;
