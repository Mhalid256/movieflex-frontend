
import React from "react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
    }`}>
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">MovieDB</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Home
            </Button>
            <Button variant="ghost" size="sm">
              Movies
            </Button>
            <Button variant="ghost" size="sm">
              TV Shows
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;