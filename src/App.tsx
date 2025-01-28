import React from "react";
import { Layout, theme } from "antd";
import ToursAdminPanel from "./pages/tours-admin-panel";

const { Header, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
          <ToursAdminPanel />
        <Footer style={{ textAlign: "center" }}>TRAVEL WORLD ADMIN</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
