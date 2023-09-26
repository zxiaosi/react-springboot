import { useEffect, useMemo, useState } from "react";
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Image, MenuProps, Dropdown, Space, Avatar } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { generateMenu } from "@/router";
import { clearLocal, getLocal, setLocal } from "@/request/auth";
import styles from "./index.module.less";
import { ImageUrl, LoginUrl, MenuStore, Title, UserInfoStore } from "@/assets/js/global";
const { Header, Sider, Content } = Layout;
import { useLogoutApi } from "@/apis";
import { useSWRConfig } from "swr";
import logo from "@/assets/images/logo.png";
import defaultImg from "@/assets/images/default.png";

const Index = () => {
  const { cache } = useSWRConfig();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false); // 是否收缩菜单
  const [currentMenu, setCurrentMenu] = useState("/dashboard"); // 当前菜单
  const [parentMenu, setParentMenu] = useState<any>([]); // 父菜单

  const { mutate } = useLogoutApi({}, { revalidateOnMount: false });

  const userInfo = getLocal(UserInfoStore); // 用户信息

  const menuItems = useMemo(() => generateMenu(getLocal(MenuStore) || []), []); // 防止每次渲染都重新生成

  /** 监听浏览器地址栏路由变化 */
  useEffect(() => {
    const pageCurrentMenu = location.pathname;
    const parts = pageCurrentMenu.split("/");
    const pageParentMenu = parts.length > 2 ? ["/" + parts[1]] : []; // 当选中二级菜单时，重新设置父级菜单
    // console.log("pageCurrentMenu", pageCurrentMenu, pageParentMenu);

    setCurrentMenu(pageCurrentMenu);
    setParentMenu(pageParentMenu);
    setLocal("parentMenu", pageParentMenu); // 防止展开菜单时, 找不到父菜单
  }, [location.pathname]);

  /** 点击菜单触发事件 */
  const handleMenu: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  /** 点击父菜单触发事件 */
  const handleParentMenu: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key: any) => parentMenu.indexOf(key) === -1); // 最后打开的菜单
    setParentMenu(latestOpenKey ? [latestOpenKey] : []); // 如果有最后打开的菜单，就展开，否则收起
  };

  /** 点击展开/收缩菜单按钮触发事件 */
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
    setTimeout(() => setParentMenu(getLocal("parentMenu")), 1000);
  };

  /**
   * 退出登录
   */
  const handleLogout = async () => {
    const { data: { code } }: any = await mutate();
    if (code == 0) {
      clearLocal();
      navigate(LoginUrl, { replace: true });
      clearCache();
    }
  }

  /**
   * 清除useSwr所有缓存的数据
   */
  const clearCache = () => [...cache.keys()].forEach((key) => cache.delete(key));

  return (
    <Layout>
      <Sider className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo_title}>
          <Image className={styles.logo} preview={false} src={logo} />
          {!collapsed && <div className={styles.title}>{Title}</div>}
        </div>

        <Menu theme="dark" mode="inline" openKeys={parentMenu} selectedKeys={[currentMenu]} items={menuItems} onClick={handleMenu} onOpenChange={handleParentMenu} />
      </Sider>

      <Layout>
        <Header className={styles.header}>
          <Button type="text" className={styles.collapsed} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={handleCollapsed} />

          <div className={styles.right}>
            <Avatar className={styles.avatar} src={<img src={userInfo.avatar ? ImageUrl + userInfo.avatar : defaultImg} alt="avatar" />} />

            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <a target="_blank" rel="noopener noreferrer" href="https://github.com/zxiaosi/react-springboot">
                        Github仓库
                      </a>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <div onClick={handleLogout}>
                        退出登录
                      </div>
                    ),
                  },
                ],
              }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className={styles.username}>{userInfo?.username || "未知用户"}</div>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>

        <Content className={styles.content}>

          {/* 指定路由组件呈现的位置, Vue中的路由出口 */}
          <Outlet />

        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;
