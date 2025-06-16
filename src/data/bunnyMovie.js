export const getBunnyVideoUrl = (tmdbId) => {
  const movieMap = {
    603692: "https://your-bunny-cdn.net/videos/avengers.mp4",
    567189: "https://your-bunny-cdn.net/videos/superman.mp4",
    1426776: "https://curemindset.b-cdn.net/movies/1_5066621091997288050.mkv", // STRAW
    // Add more mappings as you upload
  };
  return movieMap[tmdbId] || null;
};
