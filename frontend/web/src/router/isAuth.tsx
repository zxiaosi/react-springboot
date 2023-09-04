import { AUTH_PREFIX, LOGIN_ROUTE } from "@/assets/js/global";
import { Navigate } from "react-router-dom";

/** 判断是否登录 -- 路由拦截 */
const IsAuth = ({ children }: { children: JSX.Element }) => {
  const token = document.cookie.split(AUTH_PREFIX + "=")[1];
  console.log("token", token);
  return token ? children : <Navigate to={LOGIN_ROUTE} replace />;
};

export default IsAuth;