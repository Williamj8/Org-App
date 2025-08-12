import React, { type ReactNode, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Button } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;

interface Props {
  children: ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Sign Out</Menu.Item>
    </Menu>
  );

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        className="site-layout-background"
      >
        {/* Sidebar Menu with Routes */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]} // highlight active menu item by path
          style={{ height: "100%", borderRight: "1px solid gray" }}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/clients",
              icon: <LaptopOutlined />,
              label: <Link to="/clients">Clients</Link>,
            },
            {
              key: "/announcements",
              icon: <NotificationOutlined />,
              label: <Link to="/announcements">Announcements</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            onClick={toggleCollapsed}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            style={{ fontSize: "18px", width: 40, height: 40 }}
          />

          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Avatar src="https://randomuser.me/api/portraits/men/75.jpg" />
              <span style={{ marginLeft: 8 }}>Raj Singh</span>
            </div>
          </Dropdown>
        </Header>

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              background: "#e1e0e0",
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
