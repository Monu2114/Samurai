import { getDbConnection } from "@/lib/db";
import { SummaryInput } from "@/types/summary";
export async function fetchSummaries({ user_id }: { user_id: string | null }) {
  const sql = await getDbConnection();
  const summaries =
    await sql`SELECT id,user_id,original_file_url,status,title,file_name,created_at FROM pdf_summaries WHERE user_id=${user_id}`;
  console.log(summaries);
  return summaries as SummaryInput[];
}
