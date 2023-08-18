import { useGetWechatQrcode } from "@/apis";
import { AUTH_PREFIX, DefaultImage } from "@/assets/js/global";
import { setLocal } from "@/request/auth";
import { KeyOutlined, LockOutlined, UserOutlined, WechatOutlined } from "@ant-design/icons";
import { Button, Image, Input, Tabs } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

const Login = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("1"); // 选项卡
  const [form, setForm] = useState({
    username: "admin",
    password: "123456",
  }); // 表单


  const { repsonse } = useGetWechatQrcode({ isReq: tab === "2" }, {});

  /**
   * 切换选项卡
   */
  const handleTabChange = (key: string) => {
    setTab(key);
  };

  /**
   * 登录
   */
  const handleLogin = () => {
    setLocal(AUTH_PREFIX, "zxiaosi");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.title}>小四先生的栈</div>

        <Tabs
          centered
          activeKey={tab}
          onChange={handleTabChange}
          items={[
            {
              key: "1",
              label: (
                <span>
                  <KeyOutlined />
                  密码登录
                </span>
              ),
              children: (
                <div className={styles.first}>
                  <Input className={styles.user} prefix={<UserOutlined />} value={form.username} placeholder="请输入用户名" />
                  <Input.Password className={styles.pwd} prefix={<LockOutlined />} value={form.password} placeholder="请输入密码" />
                  <Button className={styles.btn} type="primary" onClick={handleLogin}>
                    登录
                  </Button>
                </div>
              ),
            },
            {
              key: "2",
              label: (
                <span>
                  <WechatOutlined twoToneColor="#1AAD19" />
                  扫码登录
                </span>
              ),
              children: <Image src={repsonse?.data ? "data:image/jpeg;base64," + repsonse?.data : DefaultImage} preview={false} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Login;
