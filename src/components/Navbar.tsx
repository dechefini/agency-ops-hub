
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isHomepage = location.pathname === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check if user is logged in (this is a mock)
    // In a real app, you would check with Supabase auth or similar
    const checkAuth = () => {
      const hasSession = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(hasSession);
    };

    checkAuth();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Proposals", path: "/proposals" },
    { name: "Clients", path: "/clients" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomepage
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold text-gradient">AgencyOS</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="hidden md:block">
              {isLoggedIn ? (
                <Button asChild size="sm" className="ml-2">
                  <Link to="/create-proposal">Create Proposal</Link>
                </Button>
              ) : (
                <Button asChild size="sm" className="ml-2">
                  <Link to="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                </Button>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="inline-flex items-center justify-center" 
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? "max-h-screen opacity-100" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? "text-primary dark:text-blue-400 bg-gray-100 dark:bg-gray-800"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            {isLoggedIn ? (
              <Button asChild size="sm" className="w-full">
                <Link to="/create-proposal" onClick={() => setIsMenuOpen(false)}>
                  Create Proposal
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="w-full">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
