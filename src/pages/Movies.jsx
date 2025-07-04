import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { fetchGenres, fetchMoviesByGenre, fetchMovieTrailer } from "../utils/tmdbApi";
import { getBunnyVideoUrl } from "../data/bunnyMovie";
import VideoModal from "../components/VideoModal";

function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
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

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

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
      <Navbar isScrolled={isScrolled} />

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
            width={modalType === "full" ? "80%" : "300"}
            height={modalType === "full" ? "80%" : "170"}
            style={{ border: 0, borderRadius: "10px" }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: white;

  .genre-selector {
    display: flex;
    gap: 1rem;
    padding: 2rem 5vw;
    flex-wrap: wrap;
    button {
      padding: 0.5rem 1.5rem;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: 0.3s ease;
      &:hover, &.active {
        background-color: #e50914;
      }
    }
  }

  .category {
    margin: 2rem 5vw;
    h2 {
      margin-bottom: 1rem;
    }
    .slider {
      display: flex;
      gap: 1rem;
      overflow-x: scroll;
      padding-bottom: 1rem;

      .movie {
        position: relative;
        min-width: 200px;
        cursor: pointer;

        img {
          width: 100%;
          border-radius: 5px;
          display: block;
        }

        .hover-buttons {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          background-color: rgba(0, 0, 0, 0.6);
          border-radius: 5px;

          button {
            padding: 0.5rem 1rem;
            border: none;
            color: white;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
          }

          .trailer-button {
            background-color: red;
          }

          .full-button {
            background-color: black;
          }
        }

        &:hover .hover-buttons {
          display: flex;
        }
      }
    }
  }

  .hover-preview {
    position: fixed;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &.trailer {
      width: 320px;
      height: 180px;
    }
    &.full {
      width: 80vw;
      height: 80vh;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 15px;
      background: transparent;
      color: white;
      font-size: 2rem;
      border: none;
      cursor: pointer;
      z-index: 1001;
    }
  }
`;

export default Movies;
