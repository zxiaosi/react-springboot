import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image, Input, message, Tabs } from "antd";
import { KeyOutlined, LockOutlined, UserOutlined, WechatOutlined } from "@ant-design/icons";
import { useWeappQrcodeApi, useLoginApi } from "@/apis";
import { Title, UserInfoStore } from "@/assets/js/global";
import beian from "@/assets/images/beian.png";
import styles from "./index.module.less";
import { setLocal } from "@/request/auth";
import defaultImg from "@/assets/images/default.png";

const Index = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [tab, setTab] = useState("1"); // 选项卡
  const [form, setForm] = useState({
    username: "admin",
    password: "123456",
  }); // 表单

  const { mutate } = useLoginApi({ data: { ...form } }, { revalidateOnMount: false }); // 登录请求
  const { repsonse } = useWeappQrcodeApi({ isReq: tab === "2", data: { path: "views/home/index", width: 100 } }); // 获取小程序二维码

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
    setLocal(UserInfoStore, data);
    code === 0 && navigate("/dashboard", { replace: true });
  };

  return (
    <div className={styles.page}>
      {contextHolder}
      <div className={styles.content}>
        <div className={styles.title}>{Title}</div>

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
                  <Input className={styles.user} prefix={<UserOutlined />} value={form.username} placeholder="请输入用户名" onChange={(e) => setForm({ ...form, username: e.target.value })} />
                  <Input.Password className={styles.pwd} prefix={<LockOutlined />} value={form.password} placeholder="请输入密码" onChange={(e) => setForm({ ...form, password: e.target.value })} />
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
              children: <Image src={repsonse?.data ? "data:image/jpeg;base64," + repsonse?.data : defaultImg} preview={false} />,
            },
          ]}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.top}>
          ©{new Date().getFullYear()} By Mr.XiaoSi
        </div>

        <div className={styles.bottom} >
          <img src={beian} />
          <div className={styles.gongan} onClick={() => window.open("http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41162502150118", "_blank")}>豫公网安备 41162502150050号</div>
          <div className={styles.beian} onClick={() => window.open("https://beian.miit.gov.cn/", "_blank")}>豫ICP备2022013376号</div>
        </div>
      </div>
    </div >
  );
};

export default Index;
