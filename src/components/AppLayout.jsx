import React from "react";
import { Layout, Menu, Modal } from "antd";
import { LogoutOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AppLayout = ({ children }) => {
  const { Header, Content } = Layout;
  const navigate = useNavigate();

  const handleClick = () => {
    Modal.confirm({
      title: "Are you sure want to logout?",
      onOk: () => navigate("/"),
    });
  };

  const items = [
    {
      label: "Players",
      key: "1",
      icon: <UserOutlined className="mr-2 text-default" />,
      onClick: () => navigate("/players"),
    },
    {
      label: "Teams",
      key: "2",
      icon: <TeamOutlined className="mr-2 text-default" />,
      onClick: () => navigate("/teams"),
    },
    {
      label: "Logout",
      key: "3",
      icon: <LogoutOutlined className="mr-2 text-default" />,
      onClick: () => handleClick(),
    },
  ];

  return (
    <Layout className="h-100vh">
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Header>
        <Content
          className="content-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
