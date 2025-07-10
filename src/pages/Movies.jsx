import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar"; // ✅ Make sure this exists
import { fetchGenres, fetchMoviesByGenre, fetchMovieTrailer } from "../utils/tmdbApi";
import { getBunnyVideoUrl } from "../data/bunnyMovie";
import Container from "../components/Container";

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
      {/* ✅ Navbar restored */}
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
