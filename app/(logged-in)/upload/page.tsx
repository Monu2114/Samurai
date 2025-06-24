import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
import BgGradient from "@/components/common/bgGradient";
export default function Page() {
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col items-center justify-center text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
}
