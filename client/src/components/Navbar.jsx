import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600' : 'text-gray-600 hover:text-primary-500';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Nuclian Esports
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className={`${isActive('/')} transition-colors duration-200`}>
              Home
            </Link>
            <Link to="/create-user" className={`${isActive('/create-user')} transition-colors duration-200`}>
              Create User
            </Link>
            <Link to="/users" className={`${isActive('/users')} transition-colors duration-200`}>
              Users
            </Link>
            <Link 
              to="/admin" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 