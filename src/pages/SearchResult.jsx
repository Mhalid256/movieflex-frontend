// src/pages/SearchResult.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchMovieTrailer } from "../utils/tmdbApi";

export default function SearchResult() {
  const { state } = useLocation();
  const { movie, bunnyUrl } = state || {};
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (movie?.id) {
        const key = await fetchMovieTrailer(movie.id);
        setTrailerKey(key);
      }
    };
    fetchTrailer();
  }, [movie]);

  if (!movie) return <Container>No results found.</Container>;

  return (
    <Container>
      <div className="poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>

        {bunnyUrl ? (
          <video controls width="100%" src={bunnyUrl}></video>
        ) : trailerKey ? (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No trailer or video available.</p>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .poster img {
    width: 300px;
    border-radius: 12px;
  }

  .info {
    max-width: 800px;
    text-align: center;
    margin-top: 2rem;
  }

  iframe, video {
    margin-top: 1rem;
    border-radius: 12px;
  }
`;
