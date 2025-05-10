import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Film, 
  PlusCircle, 
  Home, 
  Brain, 
  Menu,
  X
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";

const Header: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const closeSheet = () => {
    setOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link to="/" onClick={closeSheet}>
        <Button 
          variant={isActive("/") ? "default" : "ghost"} 
          className="flex gap-2 items-center"
        >
          <Home size={18} /> 
          <span>Home</span>
        </Button>
      </Link>
      <Link to="/new" onClick={closeSheet}>
        <Button 
          variant={isActive("/new") ? "default" : "ghost"}
          className="flex gap-2 items-center"
        >
          <PlusCircle size={18} /> 
          <span>New Entry</span>
        </Button>
      </Link>
      <Link to="/predict" onClick={closeSheet}>
        <Button 
          variant={isActive("/predict") ? "default" : "ghost"}
          className="flex gap-2 items-center"
        >
          <Brain size={18} /> 
          <span>Predict</span>
        </Button>
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline-block">Automatic Transmission</span>
            <span className="font-bold text-xl sm:hidden">AT</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <NavLinks />
          <ThemeToggle />
        </div>

        {/* Mobile navigation */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4 pt-10">
              <NavLinks />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;