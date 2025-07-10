import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { fetchGenres, fetchMoviesByGenre, fetchMovieTrailer } from "../utils/tmdbApi";
import { getBunnyVideoUrl } from "../data/bunnyMovie";

const Container = styled.div`
  padding: 20px;
  color: white;
  background-color: #000;
  min-height: 100vh;

  .genre-selector {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .genre-selector button {
    background-color: #444;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }

  .genre-selector button.active {
    background-color: #f90;
    color: black;
  }

  .category h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .slider {
    display: flex;
    overflow-x: auto;
    gap: 10px;
  }

  .movie {
    position: relative;
    min-width: 180px;
    max-width: 200px;
  }

  .movie img {
    width: 100%;
    border-radius: 10px;
  }

  .hover-buttons {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .hover-buttons button {
    background-color: #f90;
    color: #000;
    border: none;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .hover-preview {
    position: fixed;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
  }

  .hover-preview iframe {
    width: 100%;
    height: 100%;
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 30px;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }
`;

function Movies() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("trailer");

  useEffect(() => {
    const init = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
      if (genreList.length > 0) {
        setSelectedGenre(genreList[0].id);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      fetchMoviesByGenre(selectedGenre).then(setMovies);
    }
  }, [selectedGenre]);

  const handleMovieHover = async (movieId) => {
    const trailerKey = await fetchMovieTrailer(movieId);
    if (trailerKey) {
      setVideoUrl(`https://www.youtube.com/embed/${trailerKey}?autoplay=1`);
      setModalType("trailer");
      setShowModal(true);
    }
  };

  const handleMovieClick = (movieId) => {
    const bunnyUrl = getBunnyVideoUrl(movieId);
    if (bunnyUrl) {
      setVideoUrl(bunnyUrl);
      setModalType("full");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoUrl("");
  };

  return (
    <Container>
      <Navbar />

      <div className="genre-selector">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={genre.id === selectedGenre ? "active" : ""}
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <div className="category">
        <h2>{genres.find((g) => g.id === selectedGenre)?.name || "Movies"}</h2>
        <div className="slider">
          {movies.map((movie) => (
            <div className="movie" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="hover-buttons">
                <button className="trailer-button" onClick={() => handleMovieHover(movie.id)}>
                  Watch Trailer
                </button>
                <button className="full-button" onClick={() => handleMovieClick(movie.id)}>
                  Watch Full Movie
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && videoUrl && (
        <div className={`hover-preview ${modalType === "full" ? "full" : "trailer"}`}>
          <button className="close-button" onClick={closeModal}>×</button>
          <iframe
            src={videoUrl}
            title="Video Preview"
            style={{ border: 0, borderRadius: "10px" }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </Container>
  );
}

export default Movies;
