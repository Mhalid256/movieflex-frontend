import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import TVSlider from "../components/TVSlider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { fetchTVShows, fetchMovieTrailer } from "../utils/tmdbApi";

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [tvShows, setTVShows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTVShows().then((data) => setTVShows(data));
  }, []);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleTrailerClick = async (tvId) => {
    const trailerKey = await fetchMovieTrailer(tvId, "tv");
    if (trailerKey) {
      setVideoUrl(`https://www.youtube.com/embed/${trailerKey}?autoplay=1`);
      setShowModal(true);
    }
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="tv-section">
        <h1>Popular TV Shows</h1>
        <TVSlider tvShows={tvShows} onTrailerClick={handleTrailerClick} />
      </div>

      {showModal && videoUrl && (
        <div className="hover-preview">
          <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
          <iframe
            src={videoUrl}
            title="Trailer"
            width="320"
            height="180"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: #141414;
  color: white;
  padding-top: 5rem;
  .tv-section {
    padding: 2rem;
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  .hover-preview {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.95);
    padding: 1rem;
    border-radius: 10px;
  }

  .close-btn {
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 2rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
`;

export default TVShows;
