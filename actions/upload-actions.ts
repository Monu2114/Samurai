"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { getDbConnection } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { revalidatePath } from "next/cache";

interface PDFSummaryType {
  userId: string;
  originalFileUrl: string;
  summaryText: string;
  title: string;
  fileName: string;
}

export async function generateSummmary(uploadResponse: {
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}) {
  if (!uploadResponse || !uploadResponse.serverData?.file?.url) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const pdfUrl = uploadResponse.serverData.file.url;
  const fileName = uploadResponse.serverData.file.name;

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    let summary;

    try {
      summary = await generateSummaryFromOpenAI(pdfText);
    } catch (error) {
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch {
          return {
            success: false,
            message: "AI providers exhausted. Please try again later.",
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: "Failed to generate summary with OpenAI.",
          data: null,
        };
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary.",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully.",
      data: { title: formattedFileName, summary },
    };
  } catch (err) {
    return {
      success: false,
      message: "Error processing the PDF.",
      data: null,
    };
  }
}

async function saveSummaryPdf({
  userId,
  originalFileUrl,
  summaryText,
  title,
  fileName,
}: PDFSummaryType) {
  try {
    const sql = await getDbConnection();
    const result = await sql`
      INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, status, title, file_name)
      VALUES (${userId}, ${originalFileUrl}, ${summaryText}, 'completed', ${title}, ${fileName})
      RETURNING id;;
    `;
    console.log(result);
    return result[0];
  } catch (error) {
    console.error("Error saving pdf summary", error);
    throw error;
  }
}

export async function storePdfSummary({
  originalFileUrl,
  summaryText,
  title,
  fileName,
}: Omit<PDFSummaryType, "userId">) {
  let savedSummary;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    savedSummary = await saveSummaryPdf({
      userId,
      originalFileUrl,
      summaryText,
      title,
      fileName,
    });
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }
  // revalidate our cache
  revalidatePath(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: "PDF summary saved successfully.",
    data: savedSummary ?? null, // Be explicit if for some reason saveSummaryPdf fails silently
  };
}
