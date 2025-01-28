import { Breadcrumb, Button, message } from "antd";
import { Content } from "antd/es/layout/layout";
import TourForm from "../../components/tour-form";
import TourList from "../../components/tour-list";
import { useEffect, useState } from "react";
import  useToursAdminPanelLogic from "./hooks/useToursAdminPanelLogic";
import useGetToursQuery from "../../react-query/query/useGetToursQuery";
import { TourData } from "../../types/Tour/index.types";

const ToursAdminPanel = () => {
  const [editingTour, setEditingTour] = useState<TourData | null>(null);

  const { data, isLoading } = useGetToursQuery();

  const {
    colorBgContainer,
    borderRadiusLG,
    handleFormSubmit,
    handleEditTour,
    handleDeleteTour,
    handleCancelEdit,
    uploadPending,
    updatePending,
    createPending,
    deletePending,
  } = useToursAdminPanelLogic({ setEditingTour, isLoading });

  useEffect(() => {
    if (isLoading) {
      message.loading("Loading tours");
    }
  }, [isLoading]);

  return (
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
              loading={uploadPending || updatePending}
            />
          </>
        ) : (
          <TourForm
            onSubmit={handleFormSubmit}
            loading={uploadPending || createPending}
          />
        )}
        <TourList
          tours={data?.Tours}
          onEdit={handleEditTour}
          onDelete={handleDeleteTour}
          loading={isLoading || deletePending || createPending}
        />
      </div>
    </Content>
  );
};

export default ToursAdminPanel;
