import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";

export default function UserListedMovies() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [email, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content">
        <h1>My List</h1>
        <div className="grid">
          {movies.map((movie, index) => (
            <Card
              key={movie.id}
              movieData={movie}
              index={index}
              isLiked={true}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

// STYLED COMPONENT
const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    h1 {
      margin-left: 2rem;
      color: white;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1.5rem;
      padding: 0 2rem;

      .card {
        width: 100%;
        height: 225px; /* Good poster height */
        background-size: cover;
        background-position: center;
        border-radius: 0.5rem;
        transition: transform 0.3s ease;
        cursor: pointer;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
`;
