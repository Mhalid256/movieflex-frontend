// CardSlider.jsx
import React from "react";
import styled from "styled-components";

const CardSlider = ({ shows, onTrailerClick, onFullMovieClick, buttonLabel }) => {
  return (
    <SliderContainer>
      {shows.map((show) => (
        <Card key={show.id}>
          <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
          <div className="info">
            <h3>{show.name}</h3>
            <button onClick={onTrailerClick}>{buttonLabel}</button>
          </div>
        </Card>
      ))}
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 10px;
  padding: 10px 0;
`;

const Card = styled.div`
  flex: 0 0 auto;
  width: 200px;
  text-align: center;
  
  img {
    width: 100%;
    border-radius: 8px;
  }

  .info {
    margin-top: 10px;
    
    h3 {
      font-size: 1.2rem;
      color: white;
    }

    button {
      margin-top: 5px;
      background-color: #e50914;
      color: white;
      border: none;
      padding: 8px 16px;
      cursor: pointer;
    }
  }
`;

export default CardSlider;
