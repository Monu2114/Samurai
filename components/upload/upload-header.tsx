import BgGradient from "@/components/common/bgGradient";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
export default function UploadHeader() {
  return (
    <section>
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col gap-4 justify-center items-center group">
          <Badge
            variant={"secondary"}
            className="relative px-2 py-2 rounded-full text-base font-medium bg-white group-hover:bg-gray-50 transition-colors border-rose-400  hover:bg-rose-200 cursor-pointer"
          >
            <Sparkles className="h-8 w-8 mr-2 text-rose-600 animate-pulse" />
            <span>AI-Powered Content Creation</span>
          </Badge>
          <div className="flex flex-col gap-8 items-center ">
            <h1 className="font-bold">
              Start Uploading{" "}
              <span className="relative inline-block">
                <span className="relative z-10 px-2">Your PDF's</span>
                <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"></span>
              </span>
              {/* <span className="relative inline-block px-2 before:content-[''] before:absolute before:inset-0 before:bg-rose-200/50 before:-rotate-2 before:rounded-lg before:transform before:-skew-y-1 before:-z-10">
                Your PDF's
              </span> */}
            </h1>
            <p className="capitalize text-lg text-gray-500">
              Upload your PDF and let our AI do the magic!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
