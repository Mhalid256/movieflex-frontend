import React from "react";
import styled from "styled-components";

function Slider({ title = "Trending Now", movies, onTrailerClick, onFullMovieClick }) {
  return (
    <Container>
      <h1>{title}</h1>
      <div className="movies">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.image}`}
              alt={movie.name}
            />
            <div className="overlay">
              <div className="title">{movie.name}</div>
              <div className="buttons">
                <button onClick={() => onTrailerClick(movie)}>Watch Trailer</button>
                <button onClick={() => onFullMovieClick(movie)}>Watch Today's Episode</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;

  h1 {
    color: white;
    margin-bottom: 1rem;
  }

  .movies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }

  .movie-card {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.3s ease;

    img {
      width: 100%;
      height: 270px;
      object-fit: cover;
      border-radius: 10px;
      display: block;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      opacity: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: opacity 0.3s ease;
      padding: 1rem;
      text-align: center;

      .title {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }

      .buttons {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        button {
          background: #e50914;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.3s ease;

          &:hover {
            background: #f40612;
          }
        }
      }
    }

    &:hover {
      transform: scale(1.05);

      .overlay {
        opacity: 1;
      }
    }
  }
`;

export default Slider;
