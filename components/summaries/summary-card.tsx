import { Card } from "../ui/card";
import DeleteButton from "./DeleteButton";
import { SummaryInput } from "@/types/summary";
import { FileText } from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog } from "../ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { formatFileNameAsTitle } from "../../utils/format-utils";
import Link from "next/link";
export default function SummaryCard({ summary }: { summary: SummaryInput }) {
  const handleDialog = () => {};
  const time = 2;
  return (
    <div>
      <Card className="relative h-full">
        <div className="flex flex-col  p-4 sm:p-6 gap-4">
          <div className="flex justify-between ">
            <div className="flex flex-col w-1/2">
              <Link
                href={`summaries/${summary.id}`}
                className="flex items-center "
              >
                <FileText className="text-rose-400 mr-2" />
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5 ">
                  {formatFileNameAsTitle(summary.title)}
                </h3>
              </Link>
              <p className="text-sm mx-8 text-gray-500">
                {formatDistanceToNow(summary.created_at, { addSuffix: true })}
              </p>
            </div>
            <div className=" ">
              <DeleteButton id={summary.id} />
            </div>
          </div>
          <div className="mb-5">
            <p className="text-gray-600 line-clamp-2">{summary.summary_text}</p>
          </div>
          <Badge
            className={`-mb-4 capitalize font-semibold rounded-xl ${
              summary.status == "completed"
                ? " bg-green-200 text-green-600"
                : "bg-red-400"
            }`}
          >
            {summary.status}
          </Badge>
        </div>
      </Card>
    </div>
  );
}
