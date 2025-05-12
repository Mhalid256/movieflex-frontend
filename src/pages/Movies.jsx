import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "../components/Slider";
import Modal from "react-modal";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [trailerId, setTrailerId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("/api/movies"); // adjust your API route
      setMovies(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrailer = async (movie) => {
    try {
      const res = await axios.get(`/api/movies/${movie.id}/trailer`);
      setTrailerId(res.data.youtubeTrailerId); // update this line if your structure differs
      setModalIsOpen(true);
    } catch (err) {
      console.error("Failed to fetch trailer", err);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setTrailerId(null); // reset to remove iframe
  };

  const handleWatchFullMovie = (movie) => {
    // Navigate or play full movie logic
    window.location.href = `/watch/${movie.id}`;
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <Slider
        title="Trending Now"
        movies={movies}
        onTrailerClick={fetchTrailer}
        onFullMovieClick={handleWatchFullMovie}
      />

      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} contentLabel="Trailer Modal">
        <button onClick={handleCloseModal}>Close</button>
        {trailerId && (
          <iframe
            width="100%"
            height="400px"
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
            title="YouTube trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </Modal>
    </div>
  );
}

export default Movies;
