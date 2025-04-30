import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    // Ideally, verify payment with backend using the transaction tracking ID
    // Here, we just simulate a successful return
    const check = setTimeout(() => {
      navigate("/home");
    }, 3000);
    return () => clearTimeout(check);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px", color: "#fff" }}>
      <h2>Processing your payment...</h2>
      <p>You will be redirected shortly.</p>
    </div>
  );
}
