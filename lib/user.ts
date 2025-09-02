import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "@/actions/upload-count";
import { User } from "@clerk/nextjs/server";

export async function getPriceIdForActiveUsers(email: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT price_id FROM users WHERE email=${email} AND status='active'`;
  return query?.[0]?.price_id;
}

export async function HasActivePlan(email: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT price_id,status FROM users WHERE email=${email} AND status='active'`;
  return query && query.length > 0;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceIdForActiveUsers(userId);

  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";

  // const isBasic =
  // pricingPlans.find((plan) => plan.priceId === priceId)?.id === "basic";

  // const isFree =
  // pricingPlans.find((plan) => plan.priceId === priceId)?.id === "free";

  let uploadLimit: number = isPro ? 1000 : 5;

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}

export async function getSubscriptionStatus(user: User) {
  const hasSubscription = await HasActivePlan(
    user.emailAddresses[0].emailAddress
  );
  return hasSubscription;
}
