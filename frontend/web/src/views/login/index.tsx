import { useGetWeappQrcode, useLogin } from "@/apis";
import { AUTH_PREFIX, DefaultImage } from "@/assets/js/global";
import { setLocal } from "@/request/auth";
import { KeyOutlined, LockOutlined, UserOutlined, WechatOutlined } from "@ant-design/icons";
import { Button, Image, Input, Tabs } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import beian from "@/assets/images/beian.png";
import styles from "./index.module.less";

const Login = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("1"); // 选项卡
  const [form, setForm] = useState({
    username: "admin",
    password: "123456",
  }); // 表单

  const { mutate } = useLogin({ data: { ...form } }, { revalidateOnMount: false }); // 登录请求
  const { repsonse } = useGetWeappQrcode({ isReq: tab === "2" }); // 获取小程序二维码

  /**
   * 切换选项卡
   */
  const handleTabChange = (key: string) => {
    setTab(key);
  };

  /**
   * 登录
   */
  const handleLogin = async () => {
    const { data: { data, code } }: any = await mutate();
    if (code === 0) {
      setLocal(AUTH_PREFIX, data.username);
      navigate("/dashboard", { replace: true });
    }
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
                  扫码注册
                </span>
              ),
              children: <Image src={repsonse?.data ? "data:image/jpeg;base64," + repsonse?.data : DefaultImage} preview={false} />,
            },
          ]}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.top}>
          ©{new Date().getFullYear()} By Mr.XiaoSi
        </div>

        <div className={styles.bottom} onClick={() => window.open("https://beian.miit.gov.cn/", "_blank")}>
          <img src={beian} />
          <div>豫ICP备2022013376号</div>
        </div>
      </div>
    </div >
  );
};

export default Login;
