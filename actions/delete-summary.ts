"use server";
import { getDbConnection } from "@/lib/db";
import { SummaryInput } from "@/types/summary";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
export async function DeleteSummary({ id }: { id: string }) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) throw new Error("User not found");
    const sql = await getDbConnection();
    const result =
      await sql`DELETE FROM pdf_summaries WHERE id=${id} AND user_id=${userId} RETURNING id`;
    if (result.length > 0) {
      revalidatePath("/dashboard");
      return {
        success: true,
      };
    }
  } catch (error) {
    return { sucess: false };
  }
}
