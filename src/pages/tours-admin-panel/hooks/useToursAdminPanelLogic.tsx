import { theme } from "antd";
import { Dispatch, SetStateAction } from "react";
import { TourData } from "../../../types/Tour/index.types";
import useHandleFormSubmitLogic from "./nested-hooks/useHandleFormSubmitLogic";
import useTourDeleteLogic from "./nested-hooks/useTourDeleteLogic";

interface AppLogicProps {
  setEditingTour: Dispatch<SetStateAction<TourData | null>>;
  isLoading: boolean;
}

const useToursAdminPanelLogic = ({
  setEditingTour,
  isLoading,
}: AppLogicProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { uploadPending, updatePending, createPending, handleFormSubmit } =
    useHandleFormSubmitLogic();

  const { deletePending, handleDeleteTour } = useTourDeleteLogic();

  const handleEditTour = (tour: TourData) => {
    setEditingTour({ ...tour });
  };

  const handleCancelEdit = () => {
    setEditingTour(null);
  };

  return {
    colorBgContainer,
    borderRadiusLG,
    handleFormSubmit,
    handleEditTour,
    handleDeleteTour,
    handleCancelEdit,
    isLoading,
    uploadPending,
    updatePending,
    createPending,
    deletePending,
  };
};

export default useToursAdminPanelLogic;
