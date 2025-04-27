import React from "react";
import styled from "styled-components";

function Slider({ movies, onHover, onClick, onLeave }) {
  return (
    <Container>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onMouseEnter={() => onHover(movie.id)}
            onMouseLeave={onLeave}
            onClick={() => onClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.image}`}
              alt={movie.name}
            />
            <div className="info">
              <h3>{movie.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;

  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }

  .movie-card {
    background-color: #111;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    img {
      width: 100%;
      height: 270px; /* poster style (2:3) */
      object-fit: cover;
      border-radius: 5px 5px 0 0;
    }

    .info {
      padding: 0.5rem;
      color: white;
      text-align: center;

      h3 {
        font-size: 0.9rem;
        margin: 0.5rem 0 0;
      }
    }

    &:hover {
      transform: scale(1.03);
    }
  }
`;

export default Slider;
