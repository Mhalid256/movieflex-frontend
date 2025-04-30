import { useNavigate } from "react-router-dom";

const MovieTrailer = () => {
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payments/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 15000,
          description: "MovieFlex Monthly Subscription",
          email: "techmhalid@gmail.com",
          phoneNumber: "256701098373",
          firstName: "Musasizi",
          lastName: "Halid",
        }),
      });

      const data = await response.json();

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        navigate("/checkout");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing the subscription.");
    }
  };

  return (
    <div>
      <button onClick={handleSubscribe}>Subscribe Now</button>
    </div>
  );
};

export default MovieTrailer;
