import { useEffect, useMemo, useState } from "react";
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Image, MenuProps, Dropdown, Space } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
import logo from "@/assets/images/logo.png";
import { generateMenu } from "@/router";
import mockData from "@/apis/mock.json";
import { clearLocal, getLocal, setLocal } from "@/request/auth";
import styles from "./index.module.less";
import { TITLE } from "@/assets/js/global";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("/dashboard");
  const [parentMenu, setParentMenu] = useState<any>([]);

  const menuItems = useMemo(() => generateMenu(mockData), []);

  /** 监听浏览器地址栏路由变化 */
  useEffect(() => {
    const pageCurrentMenu = location.pathname;
    const parts = pageCurrentMenu.split("/");
    const pageParentMenu = parts.length > 2 ? ["/" + parts[1]] : []; // 当选中二级菜单时，重新设置父级菜单
    // console.log("pageCurrentMenu", pageCurrentMenu, pageParentMenu);

    setCurrentMenu(pageCurrentMenu);
    setParentMenu(pageParentMenu);
    setLocal("currentMenu", pageCurrentMenu);
    setLocal("parentMenu", pageParentMenu);
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
  const handleLogout = () => {
    clearLocal();
    navigate("/login", { replace: true });
  }

  return (
    <Layout>
      <Sider className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo_title}>
          <Image className={styles.logo} preview={false} src={logo} />
          {!collapsed && <div className={styles.title}>{TITLE}</div>}
        </div>

        <Menu theme="dark" mode="inline" openKeys={parentMenu} selectedKeys={[currentMenu]} items={menuItems} onClick={handleMenu} onOpenChange={handleParentMenu} />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Button type="text" className={styles.collapsed} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={handleCollapsed} />

          <div className={styles.right}>
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
                  admin
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>

        <Content style={{}} className={styles.content}>

          {/* 指定路由组件呈现的位置, Vue中的路由出口 */}
          <Outlet />

        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
