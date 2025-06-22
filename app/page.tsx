import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/home/hero-section";
export default function Home() {
  return (
    <div className="relative w-full h-full">
      <HeroSection />
    </div>
  );
}
