import React from "react";
import styled from "styled-components";

function TVSlider({ tvShows, onTrailerClick }) {
  return (
    <Container>
      {tvShows.map((tv) => (
        <div className="card" key={tv.id}>
          <img
            src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}
            alt={tv.name}
          />
          <div className="info">
            <p>{tv.name}</p>
            <button onClick={() => onTrailerClick(tv.id)}>Watch Trailer</button>
          </div>
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem 0;
  scrollbar-width: none;

  .card {
    min-width: 200px;
    max-width: 200px;
    flex-shrink: 0;
    position: relative;
    transition: transform 0.3s ease-in-out;

    img {
      width: 100%;
      border-radius: 0.5rem;
    }

    .info {
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        text-align: center;
      }

      button {
        padding: 0.3rem 0.7rem;
        font-size: 0.9rem;
        border: none;
        background-color: red;
        color: white;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export default TVSlider;
