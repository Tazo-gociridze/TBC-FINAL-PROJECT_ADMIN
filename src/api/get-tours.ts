import { TourData } from "../types/Tour/index.types";
import { supabase } from "../lib/supabaseClient";

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
