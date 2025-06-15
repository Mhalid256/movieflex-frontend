import React, { lazy, Suspense } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy load components
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Player = lazy(() => import("./pages/Player"));
const TVShows = lazy(() => import("./pages/TVShows"));
const MoviePage = lazy(() => import("./pages/Movie"));
const UserListedMovies = lazy(() => import("./pages/UserListedMovies"));
const Netflix = lazy(() => import("./pages/Netflix"));
const MovieTrailer = lazy(() => import("./pages/MovieTrailer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const PaymentConfirmation = lazy(() => import("./pages/PaymentConfirmation"));

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/player" element={<Player />} />
            <Route path="/tv" element={<TVShows />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/new" element={<Player />} />
            <Route path="/mylist" element={<UserListedMovies />} />
            <Route path="/" element={<Netflix />} />
            <Route path="/movie" element={<MovieTrailer />} />
            <Route
              path="/checkout"
              element={<ProtectedRoute><Checkout /></ProtectedRoute>}
            />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
