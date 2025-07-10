import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { searchMovies } from "../utils/tmdbApi";
import { getBunnyVideoUrl } from "../data/bunnyMovie";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      const results = await searchMovies(query);
      if (results.length > 0) {
        const movie = results[0];
        const bunnyUrl = getBunnyVideoUrl(movie.id);
        navigate("/search-result", { state: { movie, bunnyUrl } });
      }
    }
  };

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>

          {/* Hamburger / Close Icon */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </div>

          <ul className={`links flex ${menuOpen ? "mobile-open" : ""}`}>
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link} onClick={() => setMenuOpen(false)}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="right flex a-center">
          <form className={`search ${showSearch ? "show-search" : ""}`} onSubmit={handleSearchSubmit}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
              type="submit"
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </form>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

// Styled Component
const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    background-color: transparent;

    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .hamburger {
        display: none;
        font-size: 2.5rem;
        cursor: pointer;
        color: white;
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        display: flex;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }

    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    nav {
      padding: 0 1rem;
      .left {
        .hamburger {
          display: block;
        }
        .links {
          display: none;
          position: absolute;
          top: 6.5rem;
          left: 0;
          width: 100%;
          background: black;
          flex-direction: column;
          text-align: center;
          li {
            padding: 1rem 0;
            border-bottom: 1px solid #333;
          }
        }
        .links.mobile-open {
          display: flex;
        }
      }
    }
  }
`;
