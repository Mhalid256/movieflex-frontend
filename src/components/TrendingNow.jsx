import React from "react";
import "./TrendingNow.css";

const trendingMovies = [
  {
    id: 1,
    title: "The Gray Man",
    image: "https://image.tmdb.org/t/p/w500/8cXbitsS6dWQ5gfMTZdorpAAzEH.jpg"
  },
  {
    id: 2,
    title: "Stranger Things",
    image: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg"
  },
  {
    id: 3,
    title: "Money Heist",
    image: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg"
  },
  {
    id: 4,
    title: "Breaking Bad",
    image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg"
  },
  {
    id: 5,
    title: "Wednesday",
    image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/9PFonBhy4cQy7Jz20NpMygczOkv.jpg"
  }
];

function TrendingNow() {
  return (
    <div className="trending-section">
      <h2 className="section-title">Trending Now</h2>
      <div className="movie-carousel">
        {trendingMovies.map((movie, index) => (
          <div className="movie-card" key={movie.id}>
            <div className="number-badge">{index + 1}</div>
            <img src={movie.image} alt={movie.title} />
            <p className="movie-title">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



export default TrendingNow;
