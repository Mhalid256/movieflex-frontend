// Mock API functions - replace with actual TMDB API calls
export const fetchGenres = async () => {
  // Mock data - replace with actual API call
  return [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 878, name: "Science Fiction" },
    { id: 53, name: "Thriller" },
    { id: 10749, name: "Romance" },
    { id: 16, name: "Animation" },
  ];
};

export const fetchMoviesByGenre = async (genreId: number) => {
  // Mock data - replace with actual API call
  return [
    {
      id: 1,
      title: "Sample Movie 1",
      poster_path: "/sample1.jpg",
      overview: "A great movie",
      release_date: "2023-01-01",
      vote_average: 8.5,
    },
    {
      id: 2,
      title: "Sample Movie 2",
      poster_path: "/sample2.jpg",
      overview: "Another great movie",
      release_date: "2023-02-01",
      vote_average: 7.8,
    },
    // Add more mock movies...
  ];
};

export const fetchMovieTrailer = async (movieId: number) => {
  // Mock function - replace with actual API call
  return "dQw4w9WgXcQ"; // Sample YouTube video ID
};