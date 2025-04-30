import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("MTN");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      alert("Please enter your phone number.");
      return;
    }

    setLoading(true);

    try {
      // TODO: Make request to your backend to initiate mobile money payment
      // Example API call:
      /*
      await axios.post('/api/pay', {
        method: paymentMethod,
        phone: phoneNumber
      });
      */

      // Simulate payment process
      setTimeout(() => {
        setLoading(false);
        alert("Payment successful!");
        navigate("/home"); // Redirect after success
      }, 3000);

    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <Container>
      <h1>Subscribe Now</h1>
      <Form onSubmit={handlePayment}>
        <label>Select Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="MTN">MTN Mobile Money</option>
          <option value="Airtel">Airtel Money</option>
        </select>

        <label>Enter Phone Number:</label>
        <input
          type="tel"
          placeholder="e.g. 0771234567"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  h1 {
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  background-color: #111;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: 1rem;
  }

  select, input {
    padding: 0.8rem;
    border-radius: 5px;
    border: none;
    font-size: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #e50914;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: #b00610;
    }
  }
`;

export default Checkout;
