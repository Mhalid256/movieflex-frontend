import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { fetchGenres, fetchMoviesByGenre, fetchMovieTrailer } from "../utils/tmdbApi"; // Added fetchMovieTrailer

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, createCheckoutSession } from "../utils/firebase-config";



function MovieTrailer() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(""); // State for storing trailer URL
  const [showTrailer, setShowTrailer] = useState(false); // State to control trailer modal visibility

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

  // Fetch the movie trailer
  const handleMovieClick = async (movieId) => {
    const trailer = await fetchMovieTrailer(movieId);
    if (trailer) {
      setTrailerUrl(trailer);
      setShowTrailer(true);
    }
  };

  // Close the trailer modal
  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerUrl("");
  };

  const handleSubscribe = () => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          const session = await createCheckoutSession({ uid });
          window.location.href = session.data.url;
        } catch (error) {
          console.error("Error creating checkout session:", error);
        }
      } else {
        alert("Please log in to subscribe.");
      }
    });
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
            <button className="flex j-center a-center" onClick={handleSubscribe}>
                <AiOutlineInfoCircle />
                Subscribe
              </button>

          </div>
        </div>
      </div>

      {categories.map(({ genre, movies }) => (
        <div className="category" key={genre.id}>
          <h2>{genre.name}</h2>
          <div className="slider">
            {movies.map((movie) => (
              <div className="movie" key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Movie Trailer Modal */}
      {showTrailer && trailerUrl && (
        <div className="trailer-modal" onClick={closeTrailer}>
          <div className="trailer-content">
            <iframe
              src={`https://www.youtube.com/embed/${trailerUrl}`}
              title="Movie Trailer"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
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
        min-width: 200px;
        cursor: pointer;

        img {
          width: 100%;
          border-radius: 5px;
        }
      }
    }
  }

  .trailer-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .trailer-content {
      width: 80%;
      height: 80%;
      max-width: 900px;
      max-height: 600px;
    }
  }
`;

export default MovieTrailer;
