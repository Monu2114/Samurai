import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function generateSummaryFromGemini(pdfText: string) {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);

    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
