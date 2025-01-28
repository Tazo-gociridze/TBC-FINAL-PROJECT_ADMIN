import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "../../../../api/upload-image";
import { updateTour } from "../../../../api/update-tour";
import { createTour } from "../../../../api/create-tour";
import { TourData } from "../../../../types/Tour/index.types";
import { message } from "antd";
import dayjs from "dayjs";
import { GET_TOURS_QUERY_KEY } from "../../../../react-query/query/enum";
import { TOURS_MUTATIONS_KEYS } from "./enum";

const useHandleFormSubmitLogic = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: uploadMutate, isPending: uploadPending } = useMutation({
    mutationKey: [TOURS_MUTATIONS_KEYS.UPLOAD_IMAGE],
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TOURS_QUERY_KEY.TOURS] });
    },
  });

  const { mutate: updateMutate, isPending: updatePending } = useMutation({
    mutationKey: [TOURS_MUTATIONS_KEYS.UPDATE_TOUR],
    mutationFn: updateTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TOURS_QUERY_KEY.TOURS] });
    },
  });

  const { mutate: createMutate, isPending: createPending } = useMutation({
    mutationKey: [TOURS_MUTATIONS_KEYS.CREATE_TOUR],
    mutationFn: createTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TOURS_QUERY_KEY.TOURS] });
    },
  });

  const handleFormSubmit = async (values: TourData, image?: File) => {
    try {
      let imageUrl: string | undefined;
      if (image) {
        const res = await uploadMutate(image);
        if (res.error) {
          throw new Error(`Failed to upload image: ${res.error.message}`);
        }
        imageUrl = res.path;
        if (!imageUrl) {
          console.warn("Image upload successful, but imageUrl is undefined.");
        }
      }

      const { id, ...rest } = values;
      const tourData: TourData = {
        ...rest,
        image_url: imageUrl,
        start_date: values.start_date ? dayjs(values.start_date) : null,
        end_date: values.end_date ? dayjs(values.end_date) : null,
    };
      if (id) {
        if (!id) {
          throw new Error("Invalid Tour ID for update");
        }
        await updateMutate({ id, ...tourData });
        message.success("Tour updated successfully");
      } else {
        await createMutate(tourData);
        message.success("Tour created successfully");
      }

    } catch (err: unknown) {
      console.error("Error in handleFormSubmit:", err);
      if (err instanceof Error) {
        message.error(err.message || "Failed to add/update a tour.");
      } else {
        message.error("An unexpected error occurred.");
      }
    }
  };

  return {
    uploadPending,
    updatePending,
    createPending,
    handleFormSubmit,
  };
};

export default useHandleFormSubmitLogic;
