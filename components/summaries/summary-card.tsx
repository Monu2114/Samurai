import { Card } from "../ui/card";
import DeleteButton from "./DeleteButton";
import { SummaryInput } from "@/types/summary";
import Link from "next/link";
export default function SummaryCard({ summary }: { summary: SummaryInput }) {
  const time = 2;
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton />
        </div>
        <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
          <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5 ">
            {summary.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500">{time} days ago</p>
      </Card>
    </div>
  );
}
