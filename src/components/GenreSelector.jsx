import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const GenreSelector = ({ genres, selectedGenre, onGenreSelect }) => {
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-4 border-b border-border">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {genres.map((genre) => (
            <Button
              key={genre.id}
              variant={genre.id === selectedGenre ? "default" : "outline"}
              size="sm"
              onClick={() => onGenreSelect(genre.id)}
              className={`flex-shrink-0 transition-all duration-200 ${
                genre.id === selectedGenre
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {genre.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default GenreSelector;
