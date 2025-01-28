import { supabase } from "../lib/supabaseClient";
import { TourData } from "../types/Tour/index.types";

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