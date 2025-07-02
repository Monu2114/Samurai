import { UUID } from "crypto";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
export interface SummaryInput {
  //id,user_id,original_file_url,status,title,file_name,created_at
  id: UUID;
  user_id: string;
  original_file_url: string;
  summary_text: string;
  status: string;
  title: string;
  file_name: string;
  created_at: Timestamp;
}
