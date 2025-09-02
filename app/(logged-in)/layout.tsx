import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UpgradeRequired from "@/components/common/upgrade-required";
import { HasActivePlan } from "@/lib/user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const hasActiveSubscription = await HasActivePlan(
    user.emailAddresses[0].emailAddress
  );

  if (!hasActiveSubscription) return <UpgradeRequired />;

  return <>{children}</>;
}
