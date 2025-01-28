import { v4 as uuidv4 } from "uuid";
import { supabase } from "../lib/supabaseClient";

interface UploadImageResponse {
  path?: string;
  fileName?: string;
  error?: Error;
}

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