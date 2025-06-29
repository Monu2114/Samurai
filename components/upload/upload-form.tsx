"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadInputForm from "./upload-form-input";
import { toast } from "sonner";
import { useRef, useState } from "react";

import { z } from "zod";
import { generateSummmary } from "@/actions/upload-actions";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less then 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});
export default function UploadForm() {
  const [isLoading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast(
        <div>
          <p className="font-semibold">✅ Upload Successful!</p>
          <p className="text-sm text-gray-500">
            Your PDF has been uploaded. AI will summarize it shortly.
          </p>
        </div>
      );
    },
    onUploadError: (err) => {
      toast(
        <div>
          <p className="font-semibold">❌ Upload Failed</p>
          <p className="text-sm text-gray-500">
            Something went wrong while uploading. Please try again.
          </p>
        </div>
      );
    },
    onUploadBegin: ({ file }) => {
      toast(
        <div>
          <p className="font-semibold">📤 Upload Started...</p>
          <p className="text-sm text-gray-500">
            Your file is being uploaded. Please wait.
          </p>
        </div>
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      //validting the fields
      const validatedFields = schema.safeParse({ file });
      console.log(validatedFields);

      if (!validatedFields.success) {
        const errorMessage =
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file";
        toast.error(errorMessage); // Correct toast for error

        setLoading(false);
        return;
      }

      //  schema validation using zod
      // upload file to uploadThing
      // parse pdf using langchain
      // summarize using ai
      //save summary to database
      //redirect to the [id] summmary page

      const response = await startUpload([file]);
      if (!response) return;

      const result = await generateSummmary(response);
      console.log(result);

      const { data = null, message = null } = result || {};
      if (data) {
        toast(
          <div>
            <p className="font-semibold">Saving PDF...</p>
            <p className="text-sm text-gray-500">
              Hang tight! We are saving your summary!
            </p>
          </div>
        );
      }
      formRef.current?.reset();
    } catch (err) {
      console.log(err);
      formRef.current?.reset();
    }
  };

  return (
    <div className="max-w-2xl flex flex-col w-full gap-8 mx-auto">
      <UploadInputForm
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
