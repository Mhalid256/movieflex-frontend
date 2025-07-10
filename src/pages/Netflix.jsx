// [Your imports remain unchanged]
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { fetchGenres, fetchMoviesByGenre, fetchMovieTrailer } from "../utils/tmdbApi";
import { getBunnyVideoUrl } from "../data/bunnyMovie";
import VideoModal from "../components/VideoModal";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("trailer");

  useEffect(() => {
    const loadAllGenresAndMovies = async () => {
      const genres = await fetchGenres();
      const genreData = await Promise.all(
        genres.map(async (genre) => {
          const movies = await fetchMoviesByGenre(genre.id);
          return { genre, movies };
        })
      );
      setCategories(genreData);
    };
    loadAllGenresAndMovies();
  }, []);

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
      <div className="hero">
        <img src={backgroundImage} alt="background" className="background-image" />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center">
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>

      {categories.map(({ genre, movies }) => (
        <div className="category" key={genre.id}>
          <h2>{genre.name}</h2>
          <div className="slider">
            {movies.map((movie) => (
              <div className="movie" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="hover-buttons">
                  <button
                    className="trailer-button"
                    onClick={() => handleMovieHover(movie.id)}
                  >
                    Watch Trailer
                  </button>
                  <button
                    className="full-button"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    Watch Full Movie
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

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

  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      padding-left: 5vw;
      .logo img {
        width: 100%;
        max-width: 400px;
      }
      .buttons {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.5rem;
          border: none;
          background-color: #e50914;
          color: white;
          cursor: pointer;
          border-radius: 5px;
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
          }
        }
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

  @media (max-width: 768px) {
    /* Mobile styles */
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    /* Tablet styles */
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

export default Netflix;
