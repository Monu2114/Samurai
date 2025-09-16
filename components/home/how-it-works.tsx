"use client";

import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { ReactNode } from "react";
import { MotionDiv } from "../common/motion-wrapper";
import { Variants } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/constants";

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload your PDF",
    description: "Simply drag and drop your PDF document or click to upload",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI Analysis",
    description: "Our Advanced AI processes and analyses document instantly",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Get Summary",
    description: "Receive a clear, concise summary of your document",
  },
];

function StepItem({ icon, label, description }: Step) {
  return (
    <MotionDiv
      variants={itemVariants as Variants}
      className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/15 transition-colors group w-full"
    >
      <div className="flex flex-col gap-4 h-full justify-center items-center">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-gradient-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-500 ">{icon}</div>
        </div>
        <h4 className="font-bold text-xl text-center">{label}</h4>
        <p className="text-center text-gray-600 text-sm">{description}</p>
      </div>
    </MotionDiv>
  );
}

export default function HowItWorks() {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
        >
          <div
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 90% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        {/* Header */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-xl uppercase text-rose-500 mb-4">
            how it works
          </h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto">
            Transform any PDF into an easy-to-digest summary in three simple
            steps
          </h3>
        </MotionDiv>

        {/* Steps with animation */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative"
        >
          {steps.map((step, index) => (
            <div className="flex items-center" key={index}>
              <StepItem {...step} />
              {index < steps.length - 1 && (
                <div className="hidden md:block">
                  <MoveRight
                    size={32}
                    strokeWidth={2}
                    className="text-rose-400"
                  />
                </div>
              )}
            </div>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
