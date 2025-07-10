// Netflix.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { fetchGenres, fetchMoviesByGenre, fetchMovieTrailer } from "../utils/tmdbApi";
import { getBunnyVideoUrl, hasBunnyVideo } from "../data/bunnyMovie";

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
          let movies = await fetchMoviesByGenre(genre.id);
          movies.sort((a, b) => {
            const aHas = hasBunnyVideo(a.id);
            const bHas = hasBunnyVideo(b.id);
            return aHas === bHas ? 0 : aHas ? -1 : 1;
          });
          return { genre, movies };
        })
      );
      setCategories(genreData);
    };
    loadAllGenresAndMovies();
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset !== 0);
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
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
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
  // your CSS styling remains unchanged...
`;

export default Netflix;
