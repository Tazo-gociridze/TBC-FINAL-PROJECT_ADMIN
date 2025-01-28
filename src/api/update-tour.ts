import { TourData } from "../types/Tour/index.types";
import { supabase } from "../lib/supabaseClient";

export const updateTour = async (
    tourData: TourData,
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
        return data
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