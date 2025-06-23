import BgGradient from "@/components/common/bgGradient";
import { Badge } from "@/components/ui/badge";
import { Sparkle } from "lucide-react";
export default function Page() {
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col gap-4 justify-center items-center">
          <Badge>
            <Sparkle />
            <span>AI-Powered Content Creation</span>
          </Badge>
          <h1>Start Uploading Your PDF's</h1>
          <p>Upload your PDF and let our AI do the magic!</p>
        </div>
      </div>
    </section>
  );
}
