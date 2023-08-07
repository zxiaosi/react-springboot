import { AUTH_PREFIX } from "@/assets/js/global";
import { setLocal } from "@/request/auth";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setLocal(AUTH_PREFIX, "zxiaosi");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h2>登录页</h2>
        <Button type="primary" onClick={handleLogin}>
          登录
        </Button>
      </div>
    </div>
  );
};

export default Login;
