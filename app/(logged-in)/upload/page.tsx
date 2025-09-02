import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
import BgGradient from "@/components/common/bgGradient";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Page() {
  const user = await currentUser();

  if (!user?.id) redirect("/sign-in");

  const userId = user.id;

  const { hasReachedLimit } = await hasReachedUploadLimit(userId);

  if (hasReachedLimit) redirect("/dashboard");
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
