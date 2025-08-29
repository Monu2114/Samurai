import { getPriceIdForActiveUsers } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { pricingPlans } from "@/utils/constants";
export default async function PlanBadge() {
  const user = await currentUser();
  if (!user) return null;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  const priceId = await getPriceIdForActiveUsers(email as string);

  let planName = "Buy a plan";

  const plan = pricingPlans.find((plan) => plan.priceId === priceId);
  if (plan) {
    planName = plan.name;
  }
  return <div>{planName}</div>;
}
