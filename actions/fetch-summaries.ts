import { getDbConnection } from "@/lib/db";
import { SummaryInput } from "@/types/summary";
export async function fetchSummaries({ user_id }: { user_id: string | null }) {
  const sql = await getDbConnection();
  const summaries =
    await sql`SELECT id,user_id,original_file_url,status,summary_text,title,file_name,created_at FROM pdf_summaries WHERE user_id=${user_id}`;
  return summaries as SummaryInput[];
}

export default async function GetSummaryById(id: string) {
  try {
    const sql = await getDbConnection();
    const [summary] =
      await sql`SELECT id, user_id, title, original_file_url, summary_text, created_at, updated_at, status, file_name, 
LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count 
FROM pdf_summaries 
WHERE id = ${id} 
ORDER BY created_at DESC;
`;
    return summary;
  } catch (err) {
    console.error("Error fetching summary by id", err);
  }
}
