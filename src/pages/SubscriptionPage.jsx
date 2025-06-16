import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubscriptionPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone } = form;

    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all the fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/payments/subscribe", form);
      const redirectUrl = res.data;

      if (redirectUrl) {
        window.location.href = redirectUrl; // Redirect to PesaPal
      } else {
        alert("Failed to get payment link. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("An error occurred while initiating payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubscribe}>
        <h2 className="text-2xl font-bold mb-6 text-center">Subscribe Now</h2>

        {["firstName", "lastName", "email", "phone"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field === "phone" ? "e.g. 25677xxxxxxx" : ""}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 rounded text-black"
            />
          </div>
        ))}

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

export default SubscriptionPage; //strongly hate your errors
