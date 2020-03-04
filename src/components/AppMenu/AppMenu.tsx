import React, { PropsWithChildren, useState } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AppMenu = (props: PropsWithChildren<{}>) => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };
  console.log(props);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline">
          <Menu.Item key="/">
            <NavLink to="/">
              <PieChartOutlined />
              <span>Home</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/boil">
            <NavLink to="/boil">
              <DesktopOutlined />
              <span>Boil Water</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/student">
            <NavLink to="/student">
              <UserOutlined />
              <span>Student</span>
            </NavLink>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <TeamOutlined />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="/board">
            <NavLink to="/board">
              <FileOutlined />
              <span>News</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppMenu;
