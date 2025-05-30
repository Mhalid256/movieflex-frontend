import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { fetchTVShows } from "../utils/tmdbApi"; // Assuming tmdbApi fetches TV shows

// Fetch different TV Show categories from TMDB
const fetchTVShowCategories = async () => {
  const popular = await fetchTVShows("popular");
  const topRated = await fetchTVShows("top_rated");
  const airingToday = await fetchTVShows("airing_today");
  const onTheAir = await fetchTVShows("on_the_air");
  return { popular, topRated, airingToday, onTheAir };
};

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [tvShows, setTvShows] = useState({});
  const navigate = useNavigate();

  const [user, setUser] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  useEffect(() => {
    fetchTVShowCategories().then(setTvShows);
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        {Object.keys(tvShows).length ? (
          <>
            {/* Scrollable TV Show Categories */}
            {Object.entries(tvShows).map(([category, shows]) => (
              <div key={category} className="tv-show-category">
                <h2>{category.replace(/([A-Z])/g, " $1").toUpperCase()}</h2>
                <CardSlider
                  shows={shows}
                  onTrailerClick={() => {}}
                  onFullMovieClick={() => {}}
                  buttonLabel="Watch Today's Episode"
                />
              </div>
            ))}
          </>
        ) : (
          <h1 className="not-available">
            No TV Shows available. Please try again later.
          </h1>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;

    .tv-show-category {
      margin-bottom: 3rem;
    }

    .tv-show-category h2 {
      color: white;
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;

export default TVShows;
