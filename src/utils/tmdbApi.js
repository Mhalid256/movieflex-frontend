// utils/tmdbApi.js
import axios from "axios";

// Get the API key and Base URL from environment variables
const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Use the API key from environment variables
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://api.themoviedb.org/3"; // Default to the TMDB base URL if not set

// Fetch movie genres
export const fetchGenres = async () => {
  const res = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return res.data.genres;
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genreId) => {
  const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  return res.data.results;
};

// Fetch Now Playing movies
export const fetchNowPlayingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  return res.data.results;
};

// Fetch movie trailer by movie ID
export const fetchMovieTrailer = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  // Check if there's a trailer and return the first video key (YouTube trailer)
  const trailer = res.data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
  return trailer ? trailer.key : null; // If no trailer is found, return null
};
