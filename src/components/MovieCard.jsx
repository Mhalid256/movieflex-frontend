import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Eye } from "lucide-react";

const MovieCard = ({ movie, onTrailerClick, onFullMovieClick }) => {
  return (
    <Card className="group relative overflow-hidden bg-card border-border hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3]">
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />

          {/* Overlay with buttons - appears on hover */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3 p-4 rounded-lg">
            <Button
              onClick={onTrailerClick}
              variant="destructive"
              size="sm"
              className="w-full max-w-32 text-xs font-semibold"
            >
              <Play className="w-3 h-3 mr-1" />
              Trailer
            </Button>
            <Button
              onClick={onFullMovieClick}
              variant="secondary"
              size="sm"
              className="w-full max-w-32 text-xs font-semibold bg-background/90 hover:bg-background"
            >
              <Eye className="w-3 h-3 mr-1" />
              Watch Full
            </Button>
          </div>
        </div>

        {/* Movie info - visible on larger screens */}
        <div className="p-2 hidden md:block">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </p>
          {movie.vote_average > 0 && (
            <div className="flex items-center mt-1">
              <span className="text-xs text-yellow-500">★</span>
              <span className="text-xs text-muted-foreground ml-1">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
