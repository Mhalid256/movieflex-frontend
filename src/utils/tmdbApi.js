import axios from "axios";



// Replace with your actual TMDB API key
const TMDB_API_KEY = "7f602bb21d9a23e77e110e48883aebf3";
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch genres
export const fetchGenres = async () => {
  const res = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
  return res.data.genres;
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genreId) => {
  const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`);
  return res.data.results;
};

// Fetch now playing movies
export const fetchNowPlayingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`);
  return res.data.results;
};

// Fetch trailer by ID (works for both "movie" and "tv")
export const fetchMovieTrailer = async (id, type = "movie") => {
  const res = await axios.get(`${BASE_URL}/${type}/${id}/videos?api_key=${TMDB_API_KEY}`);
  const trailer = res.data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
  return trailer ? trailer.key : null;
};

// Fetch popular TV shows
export const fetchTVShows = async () => {
  const res = await axios.get(`${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
  return res.data.results;
};

// ✅ Search movies by query
export const searchMovies = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
  return res.data.results;
};
