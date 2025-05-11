import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";



import React from "react";

import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";
import MovieTrailer from "./pages/MovieTrailer";
import Checkout from "./pages/Checkout"; // your checkout page
import PaymentConfirmation from "./pages/PaymentConfirmation";


// Update App.js with lazy loading
import React, { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/Login"));
const Netflix = lazy(() => import("./pages/Netflix"));
// ... other imports

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          {/* Other routes */}
        </Routes>
      </Suspense>
    </Router>
  );
}


export default function App() {
  return (
    <Router> {/* ✅ use the alias */}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/movies" element={<MoviePage />} />
        <Route exact path="/new" element={<Player />} />
        <Route exact path="/mylist" element={<UserListedMovies />} />
        <Route exact path="/" element={<Netflix />} />
        <Route exact path="/movie" element={<MovieTrailer />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
      </Routes>
    </Router>
  );
}
