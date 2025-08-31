import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-8">
        Welcome to Nuclian Esports
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Manage your users through our modern and intuitive interface
      </p>
      <div className="flex justify-center gap-6">
        <Link
          to="/create-user"
          className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Create User
        </Link>
        <Link
          to="/users"
          className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          View Users
        </Link>
      </div>
      
      {/* Future Enhancement Suggestions */}
      <div className="mt-24 text-left">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Future Enhancements</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>JWT Authentication for secure user access</li>
          <li>Docker containerization for easy deployment</li>
          <li>Redux integration for state management</li>
          <li>Real-time updates with WebSocket</li>
          <li>User roles and permissions system</li>
          <li>Advanced user profile management</li>
        </ul>
      </div>
    </div>
  );
}

export default Home; 