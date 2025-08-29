import Stripe from "stripe";
import { getDbConnection } from "./db";
export async function handleCheckOutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  console.log(session);
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;

  if ("email" in customer && "name" in customer) {
    const email = session.customer_details?.email;
    const name = session.customer_details?.name ?? "Unknown";

    const sql = await getDbConnection();

    await createOrUpdateUser({
      sql,
      email: email as string,
      full_name: name as string,
      customer_id: customerId,
      price_id: priceId as string,
      status: "active",
    });
    console.log("User updated");

    await createPayment({
      sql,
      session,
      stripe,
      priceId: priceId as string,
      userEmail: email as string,
    });
    console.log("Payment created");
  }
}

export async function handleDeleteSubscription({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDbConnection();
    await sql`UPDATE users SET status='cancelled' WHERE customer_id=${subscription.customer}`;
    console.log("Subscription cancelled");
  } catch (err) {
    console.log("Error handling cancelled subscription", err);
  }
}
async function createOrUpdateUser({
  sql,
  email,
  full_name,
  customer_id,
  price_id,
  status,
}: {
  sql: any;
  email: string;
  full_name: string;
  customer_id: string;
  price_id: string;
  status: string;
}) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    if (user.length == 0) {
      await sql`INSERT INTO users (email,full_name,customer_id,price_id,status) VALUES (${email},${full_name},${customer_id},${price_id},${status})`;
      console.log("User created");
    }
  } catch (err) {
    console.log(err);
  }
}

async function createPayment({
  sql,
  session,
  priceId,
  userEmail,
}: {
  sql: any;
  session: Stripe.Checkout.Session;
  stripe: Stripe;
  priceId: string;
  userEmail: string;
}) {
  try {
    const { amount_total, id, status } = session;

    await sql`INSERT INTO payments (amount,status,stripe_payment_id,price_id,user_email) VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail}) RETURNING id;`;
    console.log("Payment created");
  } catch (err) {
    console.log(err);
  }
}
