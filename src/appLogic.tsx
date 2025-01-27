import {
  createTour,
  updateTour,
  uploadImage,
  deleteTour,
  getTours,
} from "./utils/tours";
import { theme, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

export interface TourData {
  id?: string;
  title: string;
  description: string;
  price: number;
  start_date: Date;
  end_date: Date;
  image_url?: string;
}

interface TourValues extends Omit<TourData, "start_date" | "end_date"> {
  id?: string;
  title: string;
  description: string;
  price: number;
  start_date: Dayjs | null;
  end_date: Dayjs | null;
  image_url?: string;
}

interface AppLogicProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTours: Dispatch<SetStateAction<TourValues[]>>;
  setEditingTour: Dispatch<SetStateAction<TourValues | null>>;
}

const appLogic = ({ setLoading, setTours, setEditingTour }: AppLogicProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchTours = async () => {
    setLoading(true);
    try {
      const data = await getTours();
      setTours(
        data
          ? data.map((tour) => ({
              ...tour,
              start_date: tour.start_date ? dayjs(tour.start_date) : null,
              end_date: tour.end_date ? dayjs(tour.end_date) : null,
            }))
          : [],
      );
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        message.error(err.message || "Failed to fetch tours.");
      } else {
        message.error("Failed to fetch tours.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values: TourValues, image?: File) => {
    setLoading(true);
    try {
      let imageUrl: string | undefined;
      if (image) {
        const res = await uploadImage(image);
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
        start_date: values.start_date?.toDate() as Date,
        end_date: values.end_date?.toDate() as Date,
      };

      if (id) {
        if (!id) {
          throw new Error("Invalid Tour ID for update");
        }
        await updateTour({ id, ...tourData });
        message.success("Tour updated successfully");
      } else {
        await createTour(tourData);
        message.success("Tour created successfully");
      }
      fetchTours();
    } catch (err: unknown) {
      console.error("Error in handleFormSubmit:", err);
      if (err instanceof Error) {
        message.error(err.message || "Failed to add/update a tour.");
      } else {
        message.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditTour = (tour: TourValues) => {
    setEditingTour({ ...tour });
  };

  const handleDeleteTour = async (id: string) => {
    setLoading(true);
    try {
      if (!id) {
        throw new Error("Invalid Tour ID for deletion");
      }
      await deleteTour(id);
      message.success("Tour deleted successfully");
      fetchTours();
    } catch (err: unknown) {
      console.error("Error in handleDeleteTour:", err);
      if (err instanceof Error) {
        message.error(err.message || "Failed to delete tour.");
      } else {
        message.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
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
    fetchTours,
  };
};

export default appLogic;
