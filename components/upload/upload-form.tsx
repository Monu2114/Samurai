"use client";

import { useUploadThing } from "@/utils/uploadthing";
import UploadInputForm from "./upload-form-input";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { z } from "zod";
import { generateSummmary, storePdfSummary } from "@/actions/upload-actions";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, "File must be < 20MB")
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const [isLoading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("✅ Upload successful! AI will summarize shortly.");
    },
    onUploadError: () => {
      toast.error("❌ Upload failed. Please try again.");
    },
    onUploadBegin: () => {
      toast("📤 Upload started...");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validated = schema.safeParse({ file });

    if (!validated.success) {
      toast.error(
        validated.error.flatten().fieldErrors.file?.[0] || "Invalid file"
      );
      setLoading(false);
      return;
    }

    const uploadResponse = await startUpload([file]);
    if (!uploadResponse || !uploadResponse[0]?.serverData) {
      toast.error("File upload failed.");
      setLoading(false);
      return;
    }

    const result = await generateSummmary(uploadResponse[0]);
    setLoading(false);

    if (result.success && result.data) {
      let storedSummary;
      toast.success("✅ Summary generated successfully!");
      storedSummary = await storePdfSummary({
        originalFileUrl: uploadResponse[0].url,
        summaryText: result.data.summary, // Assuming result.data = { summary: "..." }
        title: uploadResponse[0].name, // Or derive title however you prefer
        fileName: uploadResponse[0].name,
      });
      toast.success("Summary has been successfully summarised and saved !");
    } else {
      toast.error(result.message || "Summary generation failed.");
    }

    formRef.current?.reset();
  };

  return (
    <div className="max-w-2xl flex flex-col w-full gap-8 mx-auto">
      <UploadInputForm
        ref={formRef}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
