
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import GenreSelector from "../components/GenreSelector";
import VideoModal from "../components/VideoModal";
import { fetchGenres, fetchMoviesByGenre, fetchMovieTrailer } from "../utils/tmdbApi";
import { getBunnyVideoUrl } from "../data/bunnyMovies";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"trailer" | "full">("trailer");

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMovieHover = async (movieId: number) => {
    const trailerKey = await fetchMovieTrailer(movieId);
    if (trailerKey) {
      setVideoUrl(`https://www.youtube.com/embed/${trailerKey}?autoplay=1`);
      setModalType("trailer");
      setShowModal(true);
    }
  };

  const handleMovieClick = (movieId: number) => {
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

  const selectedGenreName = genres.find((g) => g.id === selectedGenre)?.name || "Movies";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isScrolled={isScrolled} />
      
      <div className="pt-20">
        <GenreSelector 
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
        />

        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            {selectedGenreName}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onTrailerClick={() => handleMovieHover(movie.id)}
                onFullMovieClick={() => handleMovieClick(movie.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <VideoModal
          videoUrl={videoUrl}
          modalType={modalType}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Movies;