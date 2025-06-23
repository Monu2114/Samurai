import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col justify-center items-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl ">
      <div className="">
        <div className="relative p-[1px] overflow-hidden rounded-full animate-gradient-x group bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 ">
          <Badge className=" px-6 py-2 text-base font-medium bg-white rounded-full group-hover:gray-50 transition-colors duration-100   ">
            <Sparkles className="h-10 w-10 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI </p>
          </Badge>
        </div>
      </div>
      <h1 className="py-6 text-center">
        Transform PDFs into{" "}
        <span className="relative inline-block p-1">
          <span className="absolute inset-0 bg-rose-200/50 -rotate-3 -z-10 rounded-lg "></span>
          concise
        </span>{" "}
        summaries
      </h1>

      <h2 className="text-center px-4 text-lg sm:text-xl lg:text-2xl lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds.
      </h2>
      <div>
        <Button
          variant={"link"}
          className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6  lg:mt-12 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 transition-all duration-300 hover:no-underline shadow-lg"
        >
          <Link href="#pricing" className="flex gap-2 items-center">
            <span className="font-semibold">Try Samurai</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
