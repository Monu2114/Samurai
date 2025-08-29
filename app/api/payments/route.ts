import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  handleCheckOutSessionCompleted,
  handleDeleteSubscription,
} from "@/lib/payments";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const sig = req.headers.get("stripe-signature");
  const payload = await req.text();
  let event;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret!);

    switch (event.type) {
      case "checkout.session.completed":
        const sessionId = event.data.object.id;
        console.log(sessionId);

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });
        await handleCheckOutSessionCompleted({ session, stripe });
        break;
      case "customer.subscription.deleted":
        const subscription = event.data.object;
        const sessionIdDeleted = subscription.id;
        await handleDeleteSubscription({
          subscriptionId: sessionIdDeleted,
          stripe,
        });
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to trigger webhook", err },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: "success",
  });
};
