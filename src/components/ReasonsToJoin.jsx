import React from "react";
import styled from "styled-components";

function ReasonsToJoin() {
  const reasons = [
    {
      title: "Enjoy on your TV",
      description:
        "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    },
    {
      title: "Download your shows to watch offline",
      description:
        "Save your favorites easily and always have something to watch.",
    },
    {
      title: "Watch everywhere",
      description:
        "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    },
    {
      title: "Create profiles for kids",
      description:
        "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
    },
  ];

  return (
    <Section>
      <h2>More Reasons to Join</h2>
      <div className="reasons-grid">
        {reasons.map((reason, index) => (
          <div className="reason-card" key={index}>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  background-color: black;
  color: white;
  padding: 3rem 5vw;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .reasons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
  }

  .reason-card {
    background-color: #1f1f1f;
    padding: 1.5rem;
    border-radius: 0.75rem;
    text-align: left;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 0.95rem;
    color: #ccc;
  }
`;

export default ReasonsToJoin;
