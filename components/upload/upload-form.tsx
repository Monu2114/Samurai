"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadInputForm from "./upload-form-input";
import { toast } from "sonner";

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
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("Uploaded Successfully!");
    },
    onUploadError: (err) => {
      toast.error("Upload failed. Please try again.");
    },
    onUploadBegin: ({ file }) => toast(`Upload has begun`),
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    //validting the fields
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields);

    if (!validatedFields.success) {
      const errorMessage =
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file";
      toast.error(errorMessage); // Correct toast for error
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

    const summary = await generateSummmary(response);
    console.log(summary);
  };

  return (
    <div className="max-w-2xl flex flex-col w-full gap-8 mx-auto">
      <UploadInputForm onSubmit={handleSubmit} />
    </div>
  );
}
