const handleSubscribe = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/payments/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 15000, // Set your subscription price here
        description: "MovieFlex Monthly Subscription",
        email: "techmhalid@gmail.com", // Replace with real user data
        phoneNumber: "256701098373", // Replace with real user data
        firstName: "Musasizi", // Replace with real user data
        lastName: "Halid", // Replace with real user data
      }),
    });

    const data = await response.json();

    if (data.redirect_url) {
      // Redirect to PesaPal payment page
      window.location.href = data.redirect_url;
    } else {
      alert("Failed to create payment. Please try again.");
      console.error("PesaPal response:", data);
    }
  } catch (error) {
    console.error("Payment error:", error);
    alert("An error occurred while processing the subscription.");
  }
};
