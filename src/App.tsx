import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Button } from "antd";
import TourForm from "./components/tour-form";
import TourList from "./components/tour-list";
import { TourValues } from "./components/tour-form/useTourFormLogic";
import appLogic from "./appLogic";
const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState<TourValues[]>([]);
  const [editingTour, setEditingTour] = useState<TourValues | null>(null);

  const {
    colorBgContainer,
    borderRadiusLG,
    handleFormSubmit,
    handleEditTour,
    handleDeleteTour,
    handleCancelEdit,
    fetchTours,
  } = appLogic({ setLoading, setTours, setEditingTour });

  useEffect(() => {
    fetchTours();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "Travel World" }, { title: "Tours" }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {editingTour ? (
              <>
                <Button onClick={handleCancelEdit}>Cancel Edit</Button>
                <TourForm
                  onSubmit={handleFormSubmit}
                  initialValues={editingTour}
                  loading={loading}
                />
              </>
            ) : (
              <TourForm onSubmit={handleFormSubmit} loading={loading} />
            )}
            <TourList
              tours={tours}
              onEdit={handleEditTour}
              onDelete={handleDeleteTour}
              loading={loading}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>TRAVEL WORLD ADMIN</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
