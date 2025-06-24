"use client";
import UploadInputForm from "./upload-form-input";
export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    //validting the file we are receiving from the input
  };
  return (
    <div className="max-w-2xl flex flex-col w-full gap-8 mx-auto">
      <UploadInputForm onSubmit={handleSubmit} />
    </div>
  );
}
