import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardSlider = ({ shows, onTrailerClick, onFullMovieClick, buttonLabel }) => {
  return (
    <SliderContainer>
      <div className="slider">
        {shows.map((show) => (
          <div key={show.id} className="card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt={show.name}
            />
            <div className="info">
              <h3>{show.name}</h3>
              <button className="play-btn">{buttonLabel}</button>
            </div>
          </div>
        ))}
      </div>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  .slider {
    display: flex;
    overflow-x: scroll;
    gap: 15px;

    .card {
      position: relative;
      width: 250px;
      height: 375px;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: scale(1.05);
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
      }

      .info {
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: white;

        h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .play-btn {
          background-color: #e50914;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }
      }
    }
  }
`;

export default CardSlider;
