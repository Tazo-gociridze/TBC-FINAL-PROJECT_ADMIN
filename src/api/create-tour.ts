import { supabase } from "../lib/supabaseClient";
import { TourData } from "../types/Tour/index.types";

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