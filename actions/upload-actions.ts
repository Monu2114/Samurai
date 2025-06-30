"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/gemini";

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

    return {
      success: true,
      message: "Summary generated successfully.",
      data: { summary },
    };
  } catch (err) {
    return {
      success: false,
      message: "Error processing the PDF.",
      data: null,
    };
  }
}
