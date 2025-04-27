export const getBunnyVideoUrl = (tmdbId) => {
    const movieMap = {
      603692: "https://your-bunny-cdn.net/videos/avengers.mp4",
      567189: "https://your-bunny-cdn.net/videos/superman.mp4",
      // Add more mappings...
    };
    return movieMap[tmdbId] || null;
  };
  