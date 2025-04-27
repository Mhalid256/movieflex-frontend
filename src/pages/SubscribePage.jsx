import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { httpsCallable } from "firebase/functions";
import { functions } from "../utils/firebase-config"; // your Firebase initialized functions

const stripePromise = loadStripe("your-publishable-key-here");

const SubscribePage = () => {
  const handleSubscribe = async () => {
    const stripe = await stripePromise;
    const createCheckoutSession = httpsCallable(functions, "createCheckoutSession");

    const session = await createCheckoutSession({ priceId: "your_stripe_price_id" });

    await stripe.redirectToCheckout({ sessionId: session.data.id });
  };

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h2>Subscribe to watch full movies</h2>
      <button onClick={handleSubscribe} style={{ padding: "1rem", fontSize: "16px" }}>
        Subscribe Now
      </button>
    </div>
  );
};

export default SubscribePage;
