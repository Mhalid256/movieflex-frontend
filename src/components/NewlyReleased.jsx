import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function NewlyReleased() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies/newly-released");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching newly released movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <NewReleasesContainer>
      <h2>Newly Released Movies</h2>
      <MoviesGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id}>
            <img src={movie.imageUrl} alt={movie.title} />
            <p>{movie.title}</p>
          </MovieCard>
        ))}
      </MoviesGrid>
    </NewReleasesContainer>
  );
}

const NewReleasesContainer = styled.div`
 
  padding: 2rem;
  color: white;

  h2 {
    margin-bottom: 1rem;
  }

  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }

  .movie-card {
    text-align: center;
    img {
      width: 100%;
      border-radius: 0.5rem;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.05);
      }
    }
    h4 {
      margin-top: 0.5rem;
    }
  }
`;
