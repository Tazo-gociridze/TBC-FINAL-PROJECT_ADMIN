import { Dayjs } from "dayjs";


export interface TourData {
    id?: string;
    title: string;
    description: string;
    price: number;
    start_date: Dayjs | null;
    end_date: Dayjs | null;
    image_url?: string;
    created_at: Date;
  }
