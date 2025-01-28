import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTour } from "../../../../api/delete-tour";
import { message } from "antd";

const useTourDeleteLogic = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationKey: ["delete-tour"],
    mutationFn: deleteTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
  });

  const handleDeleteTour = async (id: string) => {
    try {
      if (!id) {
        throw new Error("Invalid Tour ID for deletion");
      }
      await deleteMutate(id);
      message.success("Tour deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    } catch (err: unknown) {
      console.error("Error in handleDeleteTour:", err);
      if (err instanceof Error) {
        message.error(err.message || "Failed to delete tour.");
      } else {
        message.error("An unexpected error occurred.");
      }
    }
  };

  return {
    deletePending,
    handleDeleteTour
  };
};

export default useTourDeleteLogic;
