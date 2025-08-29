import { isDev } from "./helper";
export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "perfect for use",
    price: 0,
    items: [
      "2 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    name: "Basic",
    description: "perfect for ocassional use",
    price: 9,
    items: [
      "10 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: isDev ? "https://buy.stripe.com/test_7sY6oH8VEgmf6v3aWd33W01" : "",
    priceId: isDev ? "price_1S0ycHFa1E1RjCDc1aysspNl" : "",
  },
  {
    name: "Pro",
    description: "For professionals and teams",
    price: 19,
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: isDev ? "https://buy.stripe.com/test_5kQ28r1tcc5Zg5D1lD33W00" : "",
    priceId: isDev ? "price_1S0yfUFa1E1RjCDc0nco4fls" : "",
  },
];
