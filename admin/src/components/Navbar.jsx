import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-primary-600"
      : "text-gray-600 hover:text-primary-500";
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Nuclian Esports
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className={`${isActive("/")} transition-colors duration-200`}>
              Home
            </Link>
            <Link
              to="/create-user"
              className={`${isActive("/create-user")} transition-colors duration-200`}
            >
              Create User
            </Link>
            <Link
              to="/users"
              className={`${isActive("/users")} transition-colors duration-200`}
            >
              Users
            </Link>
            <Link
              to="/admin"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Admin Panel
            </Link>
          </div>

          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`${isActive("/")} transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              to="/create-user"
              onClick={() => setIsOpen(false)}
              className={`${isActive("/create-user")} transition-colors duration-200`}
            >
              Create User
            </Link>
            <Link
              to="/users"
              onClick={() => setIsOpen(false)}
              className={`${isActive("/users")} transition-colors duration-200`}
            >
              Users
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
