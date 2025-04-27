import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const API_KEY = "7f602bb21d9a23e77e110e48883aebf3"; // Replace with your real key

function AllCategories() {
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const genreMovies = {};
      await Promise.all(
        genres.map(async (genre) => {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`
          );
          genreMovies[genre.name] = data.results.slice(0, 12);
        })
      );
      setMoviesByGenre(genreMovies);
    };

    if (genres.length > 0) fetchMovies();
  }, [genres]);

  return (
    <Container>
      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <section key={genre}>
          <h2>{genre}</h2>
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h4>{movie.title}</h4>
              </div>
            ))}
          </div>
        </section>
      ))}
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  color: white;

  section {
    margin-bottom: 3rem;
  }

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

export default AllCategories;
