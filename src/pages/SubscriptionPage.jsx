import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubscriptionPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert("Please enter your phone number.");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post("/api/payments/subscribe", { phoneNumber });
      if (res.data.success) {
        alert("Payment initiated! Please approve the transaction on your phone.");
        // Optionally wait for confirmation or just redirect
        navigate("/home");
      } else {
        alert("Payment failed: " + res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg" onSubmit={handleSubscribe}>
        <h2 className="text-2xl font-bold mb-6 text-center">Subscribe Now</h2>

        <div className="mb-4">
          <label className="block mb-2">Phone Number</label>
          <input
            type="tel"
            placeholder="e.g. 25677xxxxxxx"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 rounded text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 py-2 rounded font-bold"
          disabled={loading}
        >
          {loading ? "Processing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

try {
  const res = await axios.post("/api/payments/subscribe", { 
    email: userEmail, // Add user email
    phone: phoneNumber,
    firstName: firstName,
    lastName: lastName
  });
  if (res.data && res.data.redirect_url) {
    window.location.href = res.data.redirect_url;
  } else {
    alert("Payment initialization failed. Please try again.");
  }
} catch (error) {
  console.error("Payment error:", error);
  alert("Payment service unavailable. Please try again later.");
}

export default SubscriptionPage;
