import { getDbConnection } from "@/lib/db";


export async function getUserUploadCount(userId: string) {
  const sql = await getDbConnection();

  try {
    const [count] =
      await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id =${userId}`;
    return count?.count;
  } catch (error) {
    console.error("Error fetching user count", error);
  }
}
