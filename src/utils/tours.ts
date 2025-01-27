import { v4 as uuidv4 } from "uuid";
import { supabase } from "../lib/supabaseClient";
import dayjs from "dayjs";
import { TourData } from "../appLogic";

interface UploadImageResponse {
  path?: string;
  fileName?: string;
  error?: Error;
}

export const getTours = async (): Promise<TourData[] | null> => {
  try {
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tours:", error);
      throw new Error(`Failed to fetch tours: ${error.message}`);
    }

    return data ? data : null;
  } catch (error: unknown) {
    console.error("Error fetching tours:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch tours: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching tours.");
    }
  }
};

export const createTour = async (
  tourData: TourData
): Promise<TourData | null> => {
  try {
    const { data, error } = await supabase
      .from("tours")
      .insert([tourData])
      .select()
      .single();

    if (error) {
      console.error("Error creating tour:", error);
      throw new Error(`Failed to create tour: ${error.message}`);
    }

    return data ? data : null;
  } catch (error: unknown) {
    console.error("Error creating tour:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create tour: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating the tour.");
    }
  }
};

export const updateTour = async (
  tourData: TourData
): Promise<TourData | null> => {
  try {
    const { data, error } = await supabase
      .from("tours")
      .update(tourData)
      .eq("id", tourData.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating tour:", error);
      throw new Error(`Failed to update tour: ${error.message}`);
    }
    if (data) {
      return {
        ...data,
        start_date: data.start_date ? dayjs(data.start_date) : null,
        end_date: data.end_date ? dayjs(data.end_date) : null,
      };
    }

    return null;
  } catch (error: unknown) {
    console.error("Error updating tour:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update tour: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while updating the tour.");
    }
  }
};

export const deleteTour = async (tourId: string): Promise<TourData | null> => {
  try {
    const { data, error } = await supabase
      .from("tours")
      .delete()
      .eq("id", tourId)
      .select()
      .single();

    if (error) {
      console.error("Error deleting tour:", error);
      throw new Error(`Failed to delete tour: ${error.message}`);
    }

    return data ? data : null;
  } catch (error: unknown) {
    console.error("Error deleting tour:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete tour: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while deleting the tour.");
    }
  }
};

export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("tour_images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    if (!data?.path) {
      console.warn("Image uploaded successfully, but path is undefined.");
      return {
        error: new Error("Image upload successful, but path is undefined."),
      };
    }

    return { path: data.path, fileName };
  } catch (error: unknown) {
    console.error("Error uploading image:", error);
    if (error instanceof Error) {
      return { error };
    } else {
      return {
        error: new Error(
          "An unknown error occurred while uploading the image."
        ),
      };
    }
  }
};
