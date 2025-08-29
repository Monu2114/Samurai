import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { pricingPlans } from "@/utils/constants";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};


const PricingCard = ({
  name,
  price = 0,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-lg p-6 border hover:border-rose-500 rounded-xl shadow-md flex flex-col gap-4 justify-between h-full",
        id === "pro" && "border-rose-500 border-2"
      )}
    >
      <div>
        <p className="text-lg font-bold">{name}</p>
        <p className="text-gray-600 capitalize ">{description}</p>
      </div>
      <div className="flex items-center gap-1">
        <h1 className="text-5xl tracking-tight">${price}</h1>
        {price > 0 && (
          <span className="flex flex-col text-sm mt-2">
            <div className="font-semibold">USD</div>
            <div className="text-gray-700 text-xs">/month</div>
          </span>
        )}
      </div>

      <ul className="flex flex-col gap-2 mt-2">
        {items.map((line, index) => (
          <li className="flex gap-2 items-center" key={index}>
            <CheckIcon className="w-4 h-4 text-rose-500" />
            {line}
          </li>
        ))}
      </ul>

      <Link
        href={paymentLink}
        className={cn(
          "mt-4 px-4 py-2 inline-flex items-center justify-center bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition",
          paymentLink ? "" : "invisible"
        )}
      >
        Buy Now
      </Link>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section>
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-xl font-bold md:text-2xl text-rose-500 uppercase">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {pricingPlans.map((type, index) => {
              return <PricingCard {...type} key={index} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
